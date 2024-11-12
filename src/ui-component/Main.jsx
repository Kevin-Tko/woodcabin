import { Outlet } from 'react-router-dom';

/* Outlet for all routes enclosed in the App layout in App component */
function Main() {
	return (
		<main className='col-end-3 bg-indigo-100 overflow-y-auto p-1'>
			<Outlet />
		</main>
	);
}

export default Main;
