import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';

function AppLayout() {
	return (
		<div className='grid grid-cols-applayoutcols grid-rows-applayoutrows h-screen w-screen bg-inherit'>
			<Sidebar />
			<Header />
			<Main />
		</div>
	);
}

export default AppLayout;
