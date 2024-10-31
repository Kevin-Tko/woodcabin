/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'

function SidebarLink({ children, icon, link }) {
    return (
        <li>
            <NavLink to={link} className="sidebarNavLink">
                <span>{icon}</span>
                {children}
            </NavLink>
        </li>
    )
}

export default SidebarLink
