import { NavLink } from 'react-router-dom'
import { HiOutlineHome } from 'react-icons/hi2'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { HiOutlineHomeModern } from 'react-icons/hi2'
import { HiOutlineUsers } from 'react-icons/hi2'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'

// bg - stone - 100

function Sidebar() {
    return (
        <aside className=" row-span-2  py-10 px-3 flex flex-col  border-r-2 border-solid border-stone-200 gap-10 bg-stone-100">
            <div className="flex flex-col items-center space-y-2 ">
                <img
                    src="images/logo.jpg"
                    alt="company logo"
                    className="inline-block max-h-24 rounded-full"
                />
                <p className="uppercase text-sm font-semibold tracking-wide">
                    The Weekend GetAway
                </p>
            </div>

            <nav className="py-4 px-2">
                <ul className=" p-3 space-y-2">
                    <li>
                        <NavLink to="dashboard" className="sidebarNavLink">
                            <span>
                                <HiOutlineHome />
                            </span>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="bookings" className="sidebarNavLink">
                            <span>
                                <HiOutlineCalendarDays />
                            </span>
                            Bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="cabins" className="sidebarNavLink">
                            <span>
                                <HiOutlineHomeModern />
                            </span>
                            Cabins
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="user" className="sidebarNavLink">
                            <span>
                                <HiOutlineUsers />
                            </span>
                            User
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="settings" className="sidebarNavLink">
                            <span>
                                <HiOutlineCog6Tooth />
                            </span>
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
