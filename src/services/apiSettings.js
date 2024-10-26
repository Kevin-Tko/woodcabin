import supabase from './supabase'

//Reading settings data from the DB
export async function getSettings() {
    const { data: settings, error } = await supabase
        .from('settings')
        .select('*')

    if (error) {
        console.error(error)
        throw new Error('Unable to fetch settings')
    }

    return settings[0]
}

//Updating settings
export async function updateSettings(col) {
    const { data: settingsUpdate, error: errUpdate } = await supabase
        .from('settings')
        .update({ ...col })
        .eq('id', 1)
        .select()

    if (errUpdate) {
        console.error(errUpdate)
        throw new Error('Failed to update settings')
    }

    return settingsUpdate
}
