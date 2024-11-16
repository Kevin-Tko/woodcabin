import { useCabin } from './useCabin';
import { formatCurrency } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

import LoadingComponent from '../../ui-component/LoadingComponent';
import { EditButton } from '../../ui-component/Button';
import { BackButton } from '../../ui-component/Button';

function CabinDetails() {
	const navigate = useNavigate();

	const { oneCabin, isLoading } = useCabin();

	if (isLoading) return <LoadingComponent />;

	const { id, name, maxCapacity, regularPrice, discount, description, image } = oneCabin[0];

	const totalPrice = regularPrice + discount;

	function handleBack() {
		navigate(-1);
	}

	function handeEdit() {
		navigate(`/edit/${id}`);
	}

	return (
		<div className='bg-indigo-50 p-8 flex flex-col gap-6 rounded'>
			<div className='flex flex-row items-center justify-between font-poppins text-sm capitalize bg-indigo-100 p-4'>
				<p>
					Cabin: <span className='font-semibold'>{name}</span>
				</p>
				<p>
					Maximum Guests: <span className='font-semibold'>{maxCapacity}</span>
				</p>
				<p className='flex flex-row gap-2'>
					<span>
						Total Price: <span className='font-semibold'>{formatCurrency(totalPrice)}</span>
					</span>
					<span
						className={`${discount ? 'lowercase px-2 bg-green-400 rounded text-indigo-50 font-semibold' : ''}`}
					>
						{discount ? 'discounted' : ''}
					</span>
				</p>
			</div>
			<div className={`grid grid-cols-2 gap-10 items-center ${!image ? 'block' : ''}`}>
				<div>
					<img src={image} alt='cabin interiors' className='rounded-sm' />
				</div>
				<p className='text-sm leading-loose font-poppins '>{description}</p>
			</div>
			<div className='space-x-6'>
				<EditButton handeEdit={handeEdit}>Edit</EditButton>
				<BackButton handleBack={handleBack}>Back</BackButton>
			</div>
		</div>
	);
}

export default CabinDetails;
