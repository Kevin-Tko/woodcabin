import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCabin } from '../../services/apiCabins';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function useAdd() {
	const queryClient = useQueryClient();
	const { reset } = useForm();

	const { isLoading, mutate } = useMutation({
		mutationFn: (newCabin) => addCabin(newCabin),
		onSuccess: () => {
			toast.success('Cabin added successfuly', { duration: '200' });
			queryClient.invalidateQueries({ queryKey: 'cabin' });
			reset();
		},
		onError: (error) => toast.error(error.message),
	});

	return { isLoading, mutate };
}
