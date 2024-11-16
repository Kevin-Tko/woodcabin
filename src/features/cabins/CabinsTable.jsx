import { useSearchParams } from 'react-router-dom';

import { useCabins } from './useCabins';

import LoadingComponent from '../../ui-component/LoadingComponent';
import ErrorComponent from '../../ui-component/ErrorComponent';
import Table from '../../ui-component/Table';

function CabinsTable() {
	const TableHeaders = ['cabin', 'capacity', 'price', 'discount', 'details'];
	const [searchParams] = useSearchParams();

	//Get all cabins using useCabins custom hook
	const { allCabins, isLoading, error } = useCabins();

	//if data is loading
	if (isLoading) return <LoadingComponent />;
	//if an error occurs while loading data
	if (error) return <ErrorComponent error={error.message} />;
	//-----------Data Quering Logic fron supaBase DB------------//

	//-------------Filter Logic-----------------//
	const filterValue = searchParams.get('discount') || 'all';

	let filterCabins;
	if (filterValue === 'all') filterCabins = allCabins;
	if (filterValue === 'no-discount') filterCabins = allCabins.filter((cabin) => cabin.discount === 0);
	if (filterValue === 'with-discount') filterCabins = allCabins.filter((cabin) => cabin.discount !== 0);
	//-------------Filter Logic-----------------//

	//-------------Sorting Logic-----------------//
	const sortValue = searchParams.get('sortBy') || 'name-asc';

	const [field, direction] = sortValue.split('-');

	const sortModifier = direction === 'asc' ? 1 : -1;

	const sortedCabins = filterCabins?.sort((a, b) => (a[field] - b[field]) * sortModifier);

	//-------------Sorting Logic-----------------//

	return <Table cabins={sortedCabins} headers={TableHeaders} />;
}

export default CabinsTable;
