import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function loginUser({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error(error.message);
		throw new Error(error.message);
	}

	return data;
}

//Getting the logged in user from supabase to allow the user to access the page after sometime without logging in
export async function getCurrentUser() {
	//Chec whether there is an active session by getting  session data from the browser local storage
	const { data: session, error: sessionError } = await supabase.auth.getSession();

	if (sessionError) throw new Error('Unable to get current session');

	//if no existing session /logged in user - return null
	if (!session.session) return null;

	//if a session exists - refetch the data again from the DB. Refetching is advised for security purposes
	const { data } = await supabase.auth.getUser();

	return data?.user;
}

export async function loggedOut() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}

export async function signUp({ email, password, fullname }) {
	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { fullname, avatar: '' } },
	});

	if (error) throw new Error(error.message);
}

export async function updateUser({ fullname, password, image }) {
	if (typeof image === 'string') {
		const { error: UpdateError } = await supabase.auth.updateUser({ password, data: { fullname, image } });

		if (UpdateError) throw new Error(UpdateError.message);
	}

	//Create unique/ramdom image name
	const imageName = `${Math.floor(Math.random() * 5000 + 1)}-${image?.name}`.replaceAll('/', '');

	const avatar = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

	const { error: UpdateError } = await supabase.auth.updateUser({ password, data: { fullname, avatar } });

	if (UpdateError) throw new Error(UpdateError.message);

	const { error: storageError } = await supabase.storage.from('avatars').upload(imageName, image, {
		cacheControl: '3600',
		upsert: false,
	});

	if (storageError) throw new Error(storageError.message);
}
