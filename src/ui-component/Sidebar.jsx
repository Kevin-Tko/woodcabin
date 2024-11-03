import Logo from './Logo'
import SidebarNav from './SidebarNav'
import Uploader from './Uploder'

// bg - stone - 100

function Sidebar() {
    return (
        <>
            <aside className=" row-span-2  py-10 px-3 flex flex-col  border-r-2 border-solid border-stone-200 gap-10 bg-stone-100">
                <Logo />
                <SidebarNav />
                <Uploader />
            </aside>
        </>
    )
}

export default Sidebar
