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
import { useEffect, useState } from 'react';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';
import { BackButton } from '../../ui-component/Button';

function CheckinDetails() {
	const navigate = useNavigate();
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [breakfastIncluded, setBreakfastIncluded] = useState(false);

	const { updating, checkin } = useCheckin();
	const { isLoading, booking, error } = useBooking();
	const { settings, loadingSettings, errorSettings } = useSettings();

	useEffect(
		function () {
			setConfirmPaid(booking?.at(0).isPaid || false);
			setBreakfastIncluded(booking?.at(0).hasBreakfast || false);
		},
		[booking],
	);

	if (isLoading || loadingSettings) return <LoadingComponent />;

	const {
		id: bookingID,
		startDate,
		endDate,
		numberGuests,
		hasBreakfast,
		cabinPrice,
		extrasPrice,
		isPaid,
		created_at,
		cabins: { name: cabinName, discount },
		guests: { name: guestName, email, nationalID, countryFlag },
	} = booking[0];

	console.log(settings);

	const { breakFastPrice } = settings;

	if (error || errorSettings) return <ErrorComponent />;

	const daysStayed = daysToStay(startDate, endDate);
	const dates = formatedDates(startDate, endDate);
	const guests = numberGuests === 1 ? 0 : numberGuests - 1;
	const totalBreakfastPrice = breakfastIncluded ? breakFastPrice * daysStayed * numberGuests : extrasPrice;
	const totalCabinPrice =
		breakFastPrice && breakfastIncluded ? cabinPrice + totalBreakfastPrice - discount : cabinPrice - discount;
	const bookingDate = formatedDateTime(created_at);

	// function handleUpdatePaid(options) {
	//     mutate(bookingID, options)
	// }

	function handleCheckin() {
		if (!confirmPaid) return;

		if (breakfastIncluded) {
			checkin({
				id: bookingID,
				breakFast: {
					hasBreakfast: true,
					extrasPrice: totalBreakfastPrice,
					totalPrice: totalCabinPrice,
				},
			});
		} else {
			checkin({ bookingID, breakFast: {} });
		}
	}

	function handleBack() {
		navigate(-1);
	}

	return (
		<div className='p-4 space-y-6 bg-indigo-50'>
			<div className='flex flex-row items-center justify-between'>
				<p>
					<span className='text-xl font-semibold'>Checkin #{bookingID}</span>
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
			<div className='space-y-6 bg-stone-200 rounded-lg'>
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
							<span>Total price {formatCurrency(totalCabinPrice)} &mdash; </span>
							<span>
								{`(Cabin ${formatCurrency(cabinPrice)} + Breakfast ${extrasPrice ? formatCurrency(extrasPrice) : formatCurrency(totalBreakfastPrice)} - Cabin Discount ${discount ? formatCurrency(discount) : formatCurrency(0)})`}
							</span>
						</p>
						<p>{isPaid ? 'Paid' : 'Not Paid'}</p>
					</div>
					<p className='text-right'>Booked {bookingDate}</p>
				</div>

				{!hasBreakfast && (
					<div className='px-6 flex flex-row gap-4 items-center'>
						<input
							type='checkbox'
							checked={breakfastIncluded}
							onChange={() => {
								setBreakfastIncluded((breakfast) => !breakfast);
								setConfirmPaid(false);
							}}
						/>
						<label>Want to add breakfast for {formatCurrency(totalBreakfastPrice)} ?</label>
					</div>
				)}
				<div className='px-6 flex flex-row gap-4 items-center'>
					<input
						type='checkbox'
						checked={confirmPaid}
						disabled={confirmPaid || updating}
						onChange={() => setConfirmPaid((confirm) => !confirm)}
					/>
					<label>
						I confirm that {guestName} has paid the total amount of {formatCurrency(totalCabinPrice)}
					</label>
				</div>
				<div className='p-4 flex flex-row gap-4 justify-end text-indigo-50'>
					<button
						className='inline-block py-1 px-2 bg-indigo-500 rounded'
						disabled={!confirmPaid || updating}
						onClick={handleCheckin}
					>
						Check In booking #{bookingID}
					</button>
					<BackButton type='reset' handleBack={handleBack}>
						Back
					</BackButton>
				</div>
			</div>
		</div>
	);
}

export default CheckinDetails;
