import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

function AppLayout() {
    return (
        <div className="grid grid-cols-applayoutcols grid-rows-applayoutrows min-w-full min-h-screen">
            <Sidebar />
            <Header />

            {/* Outlet for all routes enclosed in the App layout in App component */}
            <main className="col-end-3 bg-stone-300">
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout
