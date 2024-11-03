import supabase from './supabase'

export async function getGuest(id) {
    let { data: guest, error } = await supabase
        .from('guests')
        .select('*')
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Failed to fetch a quest')
    }

    return guest
}
