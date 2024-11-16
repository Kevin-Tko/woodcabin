import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getCabin } from '../../services/apiCabins';

export function useCabin() {
	const { cabinID } = useParams();

	if (!cabinID) {
		throw new Error('Cabin id is missing!!');
	}

	const {
		data: oneCabin,
		isLoading,
		error,
	} = useQuery({ queryKey: ['oneCabin', cabinID], queryFn: () => getCabin(cabinID) });

	return { oneCabin, isLoading, error };
}
