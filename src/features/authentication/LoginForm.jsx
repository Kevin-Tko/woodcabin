import { useState } from 'react';
import Logo from '../../ui-component/Logo';
import { useLogin } from './useLogin';
import LoginFormLabel from '../../ui-component/LoginFormLabel';
import LoginFormInput from '../../ui-component/LoginFormInput';
import { LoginFormButton } from '../../ui-component/Button';

function LoginForm() {
	const [email, setEmail] = useState('test2@gmail.com');
	const [password, setPassword] = useState('Year@2021');

	const { isLoading, mutate } = useLogin();

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (!email || !password) return;

		//Mutate function to clear input elements if login details are wrong
		mutate(
			{ email, password },
			{
				onSettled: () => {
					setEmail('');
					setPassword('');
				},
			},
		);
	}

	return (
		<div className='loginFormWrapper'>
			<Logo />

			<h2 className='text-center font-poppins tablet:text-2xl font-semibold mobile:text-xl'>
				Login to your Account
			</h2>

			<form
				className='bg-indigo-50 ring-1 ring-indigo-300 rounded space-y-6 p-4 flex flex-col justify-center items-center'
				onSubmit={handleSubmit}
			>
				<div className='flex flex-col gap-2 w-10/12'>
					<LoginFormLabel htmlfor='username'>Email Address</LoginFormLabel>
					<LoginFormInput type='text' id='username' value={email} onchange={handleEmailChange} />
				</div>

				<div className='flex flex-col gap-2 w-10/12'>
					<LoginFormLabel htmlfor='password'>Password</LoginFormLabel>
					<LoginFormInput type='password' id='password' value={password} onchange={handlePasswordChange} />
				</div>

				<div className=' w-10/12'>
					<LoginFormButton type='submit' disable={isLoading}>
						Login
					</LoginFormButton>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
