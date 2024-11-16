import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading: updating, mutate: checkin } = useMutation({
		mutationFn: ({ id, breakFast }) =>
			updateBooking(id, {
				status: 'checked-in',
				isPaid: true,
				...breakFast,
			}),
		onSuccess: () => {
			toast.success('Guest checked in successfully', {
				duration: '200',
			});
			queryClient.invalidateQueries({
				active: true,
			});
			navigate('/');
		},
		onError: () =>
			toast.error(`Failed to checkin guest`, {
				duration: '200',
			}),
	});

	return { updating, checkin };
}
