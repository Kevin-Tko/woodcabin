import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function useEdit() {
	const { reset } = useForm();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { isLoading, mutate } = useMutation({
		mutationFn: ({ fullname, password, image }) => updateUser({ fullname, password, image }),

		onSuccess: (user) => {
			console.log(user);

			toast.success('Datails updated successfully');
			queryClient.invalidateQueries({ queryKey: ['user'] });

			reset();

			navigate('/');
		},

		onError: () => {
			toast.error('Failed to update user details');
		},
	});

	return { isLoading, mutate };
}
