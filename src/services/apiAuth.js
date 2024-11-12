import supabase from './supabase'

export async function loginUser({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error(error.message)
        throw new Error(error.message)
    }

    console.log(data)
    return data
}

//Getting the logged in user from supabase to allow the user to access the page after sometime without logging in
export async function getCurrentUser() {
    //Chec whether there is an active session by getting  session data from the browser local storage
    const { data: session } = await supabase.auth.getSession()

    //if no existing session /logged in user - return null
    if (!session.session) return null

    //if a session exists - refetch the data again from the DB. Refetching is advised for security purposes
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.error(error.message)
        throw new Error(error.message)
    }

    return data?.user
}

export async function loggedOut() {
    const { error } = await supabase.auth.signOut()

    if (error) throw new Error(error.message)
}
