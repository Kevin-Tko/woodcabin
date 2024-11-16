import { useQuery } from '@tanstack/react-query';
import { getTodaysActivity } from '../../services/apiBookings';

export function useTodaysActivities() {
	const {
		data: bookingToday,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['todayActivities'],
		queryFn: getTodaysActivity,
	});

	return { bookingToday, isLoading, error };
}
