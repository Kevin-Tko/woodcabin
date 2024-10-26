import supabase, { supabaseUrl } from './supabase'

///////////////////Getting data from the Database
export async function getCabins() {
    const { data: cabins, error } = await supabase.from('cabins').select('*')

    if (error) {
        console.error(error)
        throw new Error('Failed to load cabins data')
    }

    return cabins
}

///////////////////Adding a new cabin to the cabin data
export async function addCabin(newCabin) {
    //Create unique/ramdom image name
    const imageName =
        `${Math.floor(Math.random() * 5000 + 1)}-${newCabin?.image?.name}`.replaceAll(
            '/',
            '',
        )

    //Create the custom image path
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    //Inserting new cabin data and image path
    const { data: cabin, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    //Handling errors
    if (error) {
        console.error(error)
        throw new Error('Cabin could not be added')
    }

    // 2.Upload image file to the storage bucket
    const { data, error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    //3. If error uploading image file delete the whole cabin
    if (storageError) {
        console.error(storageError)
        await supabase.from('cabins').delete().eq('id', data.id)
        throw new Error('Cabin image could not be uploaded')
    }

    return cabin
}

///////////////////Editing a Cabin
export async function editCabin(cabinToEdit, id) {
    //Check is the cabin being edited has an image uploaded already
    const hasImage = typeof cabinToEdit.image === 'string'

    //Create the custom image path
    const imageName =
        `${Math.floor(Math.random() * 5000 + 1)}-${cabinToEdit.image.name}`.replaceAll(
            '/',
            '',
        )

    const imagePath = hasImage
        ? cabinToEdit.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    const { data: editedCabin, error } = await supabase
        .from('cabins')
        .update({ ...cabinToEdit, image: imagePath })
        .eq('id', id)
        .select()

    //Handling errors
    if (error) {
        console.error(error)
        throw new Error('Cabin could not be added')
    }

    if (!hasImage) {
        // Upload image file to the storage bucket
        const { data, error: storageError } = await supabase.storage
            .from('cabin-images')
            .upload(imageName, cabinToEdit.image)

        // If error uploading image file delete the whole cabin
        if (storageError) {
            console.error(storageError)
            await supabase.from('cabins').delete().eq('id', data.id)
            throw new Error('Cabin image could not be uploaded')
        }
    }

    return editedCabin
}

///////////////////Deleting a Cabin
export async function deleteCabin(id) {
    const { data: deletedCabin, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Failed to delete cabin item')
    }

    return deletedCabin
}
