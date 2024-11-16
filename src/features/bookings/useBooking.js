import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
	const { bookingID } = useParams();

	if (!bookingID) throw new Error('BookingId not found');

	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ['booking', bookingID],
		queryFn: () => getBooking(bookingID),
	});

	return { isLoading, booking, error };
}
