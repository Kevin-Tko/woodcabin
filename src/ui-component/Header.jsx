import { HiOutlineArrowRightStartOnRectangle } from 'react-icons/hi2';
import { HiOutlineSun } from 'react-icons/hi2';
import { HiOutlineUser } from 'react-icons/hi2';
import { useLogout } from '../features/authentication/useLogout';
import { HeaderButton } from './Button';

function Header() {
	const { isLoading, logout } = useLogout();

	function handleLogout() {
		logout();
	}

	return (
		<header className='py-1 px-2 pr-4 flex flex-row items-center justify-end gap-8 bg-inherit'>
			<div className='flex flex-row items-center gap-3'>
				<img
					src='images/dev-profile.jpg'
					alt='user-profile'
					className='max-h-12 inline-block border-none rounded-full'
				/>
				<p className='text-xs font-bold lowercase tracking-wide'>UserName</p>
			</div>
			<div className='flex-row items-center gap-4 flex'>
				<HeaderButton>
					<HiOutlineUser />
				</HeaderButton>

				<HeaderButton>
					<HiOutlineSun />
				</HeaderButton>

				<HeaderButton disabled={isLoading} onclick={handleLogout}>
					<HiOutlineArrowRightStartOnRectangle />
				</HeaderButton>
			</div>
		</header>
	);
}

export default Header;
