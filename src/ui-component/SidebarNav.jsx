import { HiOutlineHome } from 'react-icons/hi2'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { HiOutlineHomeModern } from 'react-icons/hi2'
import { HiOutlineUsers } from 'react-icons/hi2'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'

import SidebarLink from './SidebarLink'

function SidebarNav() {
    return (
        <nav className="py-4 px-2">
            <ul className=" p-3 space-y-2">
                <SidebarLink icon={<HiOutlineHome />} link="dashboard">
                    Home
                </SidebarLink>

                <SidebarLink icon={<HiOutlineCalendarDays />} link="bookings">
                    Bookings
                </SidebarLink>

                <SidebarLink icon={<HiOutlineHomeModern />} link="cabins">
                    Cabins
                </SidebarLink>

                <SidebarLink icon={<HiOutlineUsers />} link="user">
                    User
                </SidebarLink>

                <SidebarLink icon={<HiOutlineCog6Tooth />} link="settings">
                    Settings
                </SidebarLink>
            </ul>
        </nav>
    )
}

export default SidebarNav