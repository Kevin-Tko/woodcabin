import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUser } from './useUser';
import { useEdit } from './useEdit';

import { BackButton, EditButton } from '../../ui-component/Button';
import Error from '../../ui-component/Error';

function EditUser() {
	const navigate = useNavigate();

	const { isLoading: loadingEdit, mutate } = useEdit();
	const { user } = useUser();

	const { fullname, avatar, email } = user.user_metadata;

	const { handleSubmit, register, formState, getValues } = useForm({ defaultValues: { email, fullname, avatar } });

	const { errors } = formState;

	function submitForm(data) {
		const { fullname, password } = data;

		const image = typeof data.avatar === 'string' ? data.avatar : data.avatar[0];

		mutate({ fullname, password, image });
	}

	function handleBack() {
		navigate('/');
	}

	return (
		<div className='flex flex-col gap-2 font-poppins'>
			<div className='py-2 px-1 tracking-wider'>
				<h1>Hello {fullname}, update your account detals here.</h1>
			</div>

			<form className='form' onSubmit={handleSubmit(submitForm)}>
				<div className='formRow'>
					<label htmlFor='fullname' className='label'>
						Full Name
					</label>
					<input
						type='text'
						id='fullname'
						disabled={loadingEdit}
						className='input'
						{...register('fullname', {
							required: 'This is a required field!',
						})}
					/>
					{errors?.fullname && <Error>{errors.fullname.message}</Error>}
				</div>

				<div className='formRow'>
					<label htmlFor='avatar' className='label'>
						Profile Photo
					</label>
					<input
						type='file'
						id='avatar'
						disabled={loadingEdit}
						className='input'
						{...register('avatar')}
						accept='image/*'
					/>
					{errors?.avatar && <Error>{errors.avatar.message}</Error>}
				</div>

				<div className='formRow'>
					<label htmlFor='email' className='label'>
						Email Address
					</label>
					<input
						type='email'
						id='email'
						disabled={true}
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
						New Password (min 8 characters)
					</label>
					<input
						type='password'
						id='password'
						disabled={loadingEdit}
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
						Repeat New Password
					</label>
					<input
						type='password'
						id='repeatPassword'
						disabled={loadingEdit}
						className='input'
						{...register('repeatPassword', {
							required: 'This is a required field!',
							validate: (value) => value === getValues().password || 'Password does not match',
						})}
					/>
					{errors?.repeatPassword && <Error>{errors.repeatPassword.message}</Error>}
				</div>

				<div className='space-x-4'>
					<BackButton handleBack={handleBack} type='reset' disabled={loadingEdit}>
						Cancel
					</BackButton>
					<EditButton type='submit' disabled={loadingEdit}>
						Edit
					</EditButton>
				</div>
			</form>
		</div>
	);
}

export default EditUser;
