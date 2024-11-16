import { useSearchParams } from 'react-router-dom';
import { useBookings } from './useBookings';

import LoadingComponent from '../../ui-component/LoadingComponent';
import ErrorComponent from '../../ui-component/ErrorComponent';
import HeaderComponent from './HeaderComponent';
import Pagination from '../../ui-component/Pagination';
import Table from '../../ui-component/Table';

function BookingsTable() {
	const tableHeaders = ['Cabin', 'Guest', 'Days', 'Status', 'Amount', 'Details'];

	const [searchParams] = useSearchParams();

	//Using the useBookings custom hook
	const { isLoading, error, bookings, count } = useBookings();

	if (isLoading) return <LoadingComponent />;
	if (error) return <ErrorComponent error={error.message} />;

	//-------------Filter Logic-----------------//
	// const filterValue = searchParams.get('status') || 'all'

	let filterBookings = bookings;

	const sortValue = searchParams.get('sortBy') || 'totalPrice-asc';

	const [field, direction] = sortValue.split('-');

	const sortModifier = direction === 'asc' ? 1 : -1;

	const sortedBookings = filterBookings?.sort((a, b) => (a[field] - b[field]) * sortModifier);

	//-------------Sorting Logic-----------------//

	return (
		<>
			<HeaderComponent />
			<Table bookings={sortedBookings} headers={tableHeaders} />
			<Pagination count={count} />
		</>
	);
}

export default BookingsTable;
