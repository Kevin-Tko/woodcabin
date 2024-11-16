import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function useSignUp() {
	const { reset } = useForm();
	const navigate = useNavigate();

	const { isLoading, mutate } = useMutation({
		mutationFn: ({ email, password, fullname }) => signUp({ email, password, fullname }),

		onSuccess: (user) => {
			console.log(user);
			toast.success('User created successfully', { duration: '500' });
			reset();

			navigate('/');
		},

		onError: () => {
			toast.error('Failed to create user');
		},
	});

	return { isLoading, mutate };
}
