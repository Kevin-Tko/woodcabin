import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export function useEdit() {
	const queryClient = useQueryClient();
	const { reset } = useForm();

	const { isLoading, mutate } = useMutation({
		mutationFn: ({ cabin, id }) => editCabin(cabin, id),

		onSuccess: () => {
			toast.success('Cabin successfuly edited', { duration: '200' });

			queryClient.invalidateQueries({ queryKey: 'cabin' });

			reset();
		},

		onError: (error) => toast.error(error.message),
	});

	return { isLoading, mutate };
}
