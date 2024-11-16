import CabinsTable from '../features/cabins/CabinsTable';
import HeaderComponent from '../features/cabins/HeaderComponent';
import { ButtonAddCabin } from '../ui-component/Button';

function Cabins() {
	return (
		<div className='p-4 space-y-3 bg-inherit'>
			<HeaderComponent />
			<CabinsTable />
			<ButtonAddCabin route='addCabin'>Add Cabin</ButtonAddCabin>
		</div>
	);
}

export default Cabins;
