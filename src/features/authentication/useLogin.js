import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { isLoading: loggingIn, mutate: login } = useMutation({
		mutationFn: ({ email, password }) => loginUser({ email, password }),
		onSuccess: (user) => {
			toast.success('Logged in succefully', { duration: '100' });
			queryClient.setQueryData(['user'], user.user);
			navigate('/dashboard', { replace: true });
		},
		onError: (err) => toast.error(err.message),
	});

	return { loggingIn, login };
}
