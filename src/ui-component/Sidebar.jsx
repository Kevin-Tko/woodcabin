import Logo from './Logo';
import SidebarNav from './SidebarNav';
import Uploader from './Uploder';

function Sidebar() {
	return (
		<aside className=' row-span-2 flex flex-col bg-inherit font-poppins p-1 justify-center gap-4 border-r border-indigo-200'>
			<Logo />
			<SidebarNav />
			<Uploader />
		</aside>
	);
}

export default Sidebar;
