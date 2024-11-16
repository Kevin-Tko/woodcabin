import { useQuery } from '@tanstack/react-query';
import { getBookingsAfterDate } from '../../services/apiBookings';

import { calculateDaysAgo, formatDateToISOWithOffset } from '../../utils/helpers';
import { useSearchParams } from 'react-router-dom';

export function useBookingStats() {
	const [searchParams] = useSearchParams();

	const days = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));

	const date = calculateDaysAgo(days);
	const now = formatDateToISOWithOffset();

	const {
		data: bookings,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['bookingStata', days],
		queryFn: () => getBookingsAfterDate(date, now),
	});

	return { bookings, isLoading, error };
}
