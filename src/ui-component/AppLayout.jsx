import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

function AppLayout() {
    return (
        <div className="grid grid-cols-applayoutcols grid-rows-applayoutrows h-screen">
            <Sidebar />
            <Header />

            {/* Outlet for all routes enclosed in the App layout in App component */}

            <main className="col-end-3 pt-1 pb-2 px-1 overflow-y-scroll bg-stone-300">
                <div className="bg-stone-300 max-w-4xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AppLayout
