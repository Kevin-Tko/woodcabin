import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading: isCheckingout, mutate: checkout } = useMutation({
		mutationFn: (id) =>
			updateBooking(id, {
				status: 'checked-out',
			}),
		onSuccess: () => {
			toast.success('Guest checked out successfully', {
				duration: '200',
			});
			queryClient.invalidateQueries({
				active: true,
			});
			navigate('/');
		},
		onError: () =>
			toast.error(`Failed to checkout guest`, {
				duration: '200',
			}),
	});

	return { isCheckingout, checkout };
}
