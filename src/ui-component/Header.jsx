import { HiOutlineArrowRightStartOnRectangle } from 'react-icons/hi2';
// import { HiOutlineSun } from 'react-icons/hi2';
import { HiOutlineUser } from 'react-icons/hi2';
import { useLogout } from '../features/authentication/useLogout';
import { HeaderButton } from './Button';
import { useUser } from '../features/authentication/useUser';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from './LoadingComponent';

function Header() {
	const navigate = useNavigate();
	const { isLoading: logOutLoading, logout } = useLogout();

	const { isLoading: getUserLoading, user } = useUser();

	if ((logOutLoading, getUserLoading)) return <LoadingComponent />;

	const { fullname, avatar } = user.user_metadata;

	function handleUserAccount() {
		navigate('/account');
	}

	function handleLogout() {
		logout();
	}

	return (
		<header className='py-1 px-2 pr-4 flex flex-row items-center justify-end gap-8 bg-inherit'>
			<div className='flex flex-row items-center gap-3'>
				<img
					src={`${avatar ? avatar : '/images/default.jpg'}`}
					alt='user-profile'
					className='max-h-12 inline-block border-none rounded-full'
				/>
				<p className='text-xs font-bold lowercase tracking-wide text-indigo-600'>{fullname}</p>
			</div>
			<div className='flex-row items-center gap-4 flex'>
				<HeaderButton onclick={handleUserAccount}>
					<HiOutlineUser />
				</HeaderButton>

				{/* <HeaderButton>
					<HiOutlineSun />
				</HeaderButton> */}

				<HeaderButton disabled={logOutLoading} onclick={handleLogout}>
					<HiOutlineArrowRightStartOnRectangle />
				</HeaderButton>
			</div>
		</header>
	);
}

export default Header;
