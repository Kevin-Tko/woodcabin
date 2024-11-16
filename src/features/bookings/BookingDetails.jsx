import { HiOutlineArrowLongLeft } from 'react-icons/hi2';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { HiOutlineXCircle } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useBooking } from './useBooking';
import { daysToStay, formatedDates, formatCurrency, formatedDateTime } from '../../utils/helpers';
import LoadingComponent from '../../ui-component/LoadingComponent';
import ErrorComponent from '../../ui-component/ErrorComponent';
import { useCheckout } from './useCheckout';
import { useDelete } from './useDelete';
import ConfirmDelete from '../../ui-component/ConfirmDelete';
import { useState } from 'react';

function BookingDetails() {
	const [deleteBooking, setDeleteBooking] = useState(false);

	const navigate = useNavigate();

	const { isLoading, booking, error } = useBooking();
	const { isCheckingout, checkout } = useCheckout();
	const { deletingBooking, bookingDelete } = useDelete();

	if (isLoading || isCheckingout || deletingBooking) return <LoadingComponent />;

	const {
		id: bookingID,
		status,
		startDate,
		endDate,
		numberGuests,
		hasBreakfast,
		cabinPrice,
		extrasPrice,
		totalPrice,
		isPaid,
		created_at,
		cabins: { name: cabinName, discount },
		guests: { name: guestName, email, nationalID, countryFlag },
	} = booking[0];

	if (error || !bookingID) return <ErrorComponent />;

	const daysStayed = daysToStay(startDate, endDate);
	const dates = formatedDates(startDate, endDate);
	const guests = numberGuests === 1 ? 0 : numberGuests - 1;
	// const totalPrice = extrasPrice ? cabinPrice + extrasPrice : cabinPrice;
	const bookingDate = formatedDateTime(created_at);

	function handleCheckout() {
		checkout(bookingID);
	}

	function handleDelete() {
		bookingDelete(bookingID);
	}

	return (
		<div className='p-4 space-y-6 bg-indigo-50'>
			<div className='flex flex-row items-center justify-between bg-indigo-100 py-4 px-1'>
				<p className='flex flex-row gap-8 items-center'>
					<span className='text-xl font-semibold'>Booking #{bookingID}</span>
					<span
						className={`${status === 'checked-in' ? 'bg-green-500' : status === 'unconfirmed' ? 'bg-red-500' : 'bg-stone-400'} px-2 rounded-full text-xs lowercase`}
					>
						{status}
					</span>
				</p>
				<button
					className='flex flex-row gap-3 items-center ring-1 rounded ring-stone-50 p-1'
					onClick={() => navigate(-1)}
				>
					<span>
						<HiOutlineArrowLongLeft />
					</span>
					<span>Back</span>
				</button>
			</div>
			<div className='space-y-6  rounded-lg relative'>
				<div className='flex flex-row items-center justify-between bg-indigo-400 p-4 text-stone-50'>
					<p className='flex flex-row items-center gap-4 text-sm'>
						<span className='text-2xl'>
							<HiOutlineHomeModern />
						</span>
						<span>
							{daysStayed} nights in Cabin {cabinName}
						</span>
					</p>
					<p className='text-sm'>
						{dates.formattedSD} &mdash; {dates.formattedED}
					</p>
				</div>
				<div className='p-4 space-y-6'>
					<p className='flex flex-row gap-4 items-center text-sm'>
						<span className='rounded'>
							<img src={countryFlag} alt='country flag' className='h-3 rounded' />
						</span>
						<span>
							{guestName} {guests ? `+ ${guests} guests` : ''} &bull; {email} &bull; National ID:{' '}
							{nationalID}1
						</span>
					</p>
					<p className='flex flex-row gap-4 items-center text-sm'>
						<span className={hasBreakfast ? 'text-green-500' : 'text-red-500'}>
							{hasBreakfast ? <HiOutlineCheckCircle /> : <HiOutlineXCircle />}
						</span>
						<span>Breakfast included?</span>
						<span>{hasBreakfast ? 'Yes' : 'No'}</span>
					</p>
					<div
						className={`flex flex-row justify-between items-center py-2 px-1 rounded text-sm ${isPaid ? 'bg-green-200' : 'bg-red-200'}`}
					>
						<p className='flex flex-row gap-4 items-center'>
							<span>
								<HiOutlineCurrencyDollar />
							</span>
							<span>Total price {formatCurrency(totalPrice)}</span>
							<span>
								{`(Cabin price ${formatCurrency(cabinPrice)} + Breakfast ${extrasPrice ? formatCurrency(extrasPrice) : formatCurrency(0)} - Cabin Discount ${discount ? formatCurrency(discount) : formatCurrency(0)} )`}
							</span>
						</p>
						<p>{isPaid ? 'Paid' : 'Not Paid'}</p>
					</div>
					<p className='text-right'>Booked on: {bookingDate}</p>
				</div>
				<div className='p-4 flex flex-row gap-4 justify-end text-indigo-50'>
					{status === 'unconfirmed' && (
						<button
							className='inline-block py-1 px-2 bg-indigo-500 rounded'
							onClick={() => navigate(`/checkin/${bookingID}`)}
							disabled={isCheckingout}
						>
							Check In
						</button>
					)}
					{status === 'checked-in' && (
						<button className='inline-block py-1 px-2 bg-indigo-500 rounded' onClick={handleCheckout}>
							Check Out
						</button>
					)}

					<button
						className='inline-block py-1 px-2 bg-red-400 rounded'
						onClick={() => setDeleteBooking(true)}
					>
						Delete Booking
					</button>
				</div>
				{deleteBooking && <ConfirmDelete handleDelete={handleDelete} setDelete={setDeleteBooking} />}
			</div>
		</div>
	);
}

export default BookingDetails;
