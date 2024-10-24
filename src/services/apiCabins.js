import supabase from './supabase'

//using supabase client to query the DB
export async function getCabins() {
    const { data: cabins, error } = await supabase.from('cabins').select('*')

    if (error) {
        console.error(error)
        throw new Error('Failed to load cabins data')
    }

    return cabins
}

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

export async function addCabin(newCabin) {
    const { data: cabin, error } = await supabase
        .from('cabins')
        .insert([newCabin])
        .select()

    if (error) {
        console.error(error)
        throw new Error('Cabin could not be added')
    }

    return cabin
}
