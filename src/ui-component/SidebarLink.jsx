/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

//sidebarNavLink

function SidebarLink({ children, icon, link }) {
	return (
		<li className='flex flex-row justify-center'>
			<NavLink to={link} className='grid grid-cols-navlinkcols gap-3 w-full content-center p-2 rounded'>
				<span className='self-center justify-self-end'>{icon}</span>
				{children}
			</NavLink>
		</li>
	);
}

export default SidebarLink;
