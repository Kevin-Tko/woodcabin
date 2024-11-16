import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

//Get all cabins from the DB
export function useCabins() {
	const {
		data: allCabins,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['Cabins'],
		queryFn: getCabins,
	});

	return { allCabins, isLoading, error };
}
