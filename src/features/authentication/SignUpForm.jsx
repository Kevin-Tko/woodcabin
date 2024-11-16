import { useNavigate } from 'react-router-dom';
import { BackButton, EditButton } from '../../ui-component/Button';
import { useForm } from 'react-hook-form';
import Error from '../../ui-component/Error';
import { useSignUp } from './useSignUp';

import LoadingComponent from '../../ui-component/LoadingComponent';

function SignUpForm() {
	const navigate = useNavigate();

	const { isLoading, mutate } = useSignUp();

	const { handleSubmit, register, formState, getValues } = useForm();

	const { errors } = formState;

	function submitForm({ email, fullname, password }) {
		console.log(email, fullname, password);
		mutate({ email, fullname, password });
	}

	function handleBack() {
		navigate('/');
	}

	if (isLoading) return <LoadingComponent />;

	return (
		<div className='flex flex-col gap-2 font-poppins'>
			<div className='py-2 px-1 font-semibold'>
				<h1>Create user here</h1>
			</div>
			<form className='form' onSubmit={handleSubmit(submitForm)}>
				<div className='formRow'>
					<label htmlFor='fullname' className='label'>
						Full Name
					</label>
					<input
						type='text'
						id='fullname'
						disabled={isLoading}
						className='input'
						{...register('fullname', {
							required: 'This is a required field!',
						})}
					/>
					{errors?.fullname && <Error>{errors.fullname.message}</Error>}
				</div>
				<div className='formRow'>
					<label htmlFor='email' className='label'>
						Email Address
					</label>
					<input
						type='email'
						id='email'
						disabled={isLoading}
						className='input'
						{...register('email', {
							required: 'This is a required field!',
							pattern: { value: /\S+@\S+\.\S+/, message: 'Please provide a valid email!!' },
						})}
					/>
					{errors?.email && <Error>{errors.email.message}</Error>}
				</div>
				<div className='formRow'>
					<label htmlFor='password' className='label'>
						Password (min 8 characters)
					</label>
					<input
						type='password'
						id='password'
						disabled={isLoading}
						className='input'
						{...register('password', {
							required: 'This is a required field!',
							minLength: { value: 8, message: 'Password must be 8 characters' },
						})}
					/>
					{errors?.password && <Error>{errors.password.message}</Error>}
				</div>
				<div className='formRow'>
					<label htmlFor='repeatPassword' className='label'>
						Repeat Password
					</label>
					<input
						type='password'
						id='repeatPassword'
						disabled={isLoading}
						className='input'
						{...register('repeatPassword', {
							required: 'This is a required field!',
							validate: (value) => value === getValues().password || 'Password does not match',
						})}
					/>
					{errors?.repeatPassword && <Error>{errors.repeatPassword.message}</Error>}
				</div>
				<div className='space-x-4'>
					<BackButton handleBack={handleBack} type='reset' disabled={isLoading}>
						Cancel
					</BackButton>
					<EditButton type='submit' disabled={isLoading}>
						Create User
					</EditButton>
				</div>
			</form>
		</div>
	);
}

export default SignUpForm;
