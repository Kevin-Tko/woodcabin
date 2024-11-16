import { useTodaysActivities } from './useTodaysActivities';
import LoadingComponent from '../../ui-component/LoadingComponent';
import ErrorComponent from '../../ui-component/ErrorComponent';
import { useNavigate } from 'react-router-dom';

function TodayActivity() {
	const navigate = useNavigate();

	const { bookingToday, isLoading, error } = useTodaysActivities();

	if (isLoading) return <LoadingComponent />;
	if (error) return <ErrorComponent />;

	function handleAction(id) {
		navigate(`/bookings/${id}`);
	}

	if (bookingToday.length <= 0)
		return (
			<div className='bg-indigo-50 p-2 space-y-6'>
				<h2>Today ativities</h2>
				<p className='text-xs'>No activities today</p>
			</div>
		);

	return (
		<div className='bg-indigo-50 p-2 flex flex-col gap-4 overflow-scroll'>
			<h2>Today ativities</h2>

			{bookingToday.map((el) => (
				<div className='text-xs grid grid-cols-today gap-2 justify-items-start space-y-2 ' key={el.id}>
					<p
						className={`place-content-end ${el.status === 'checked-in' ? 'text-green-500' : 'text-indigo-500'}`}
					>
						{el.status === 'checked-in' ? 'Departure' : 'Arrival'}
					</p>

					<p>
						<img src={el.guests.countryFlag} alt='flag' className='max-h-5 max-w-5 rounded inline-block' />
					</p>

					<p>{el.guests.name}</p>

					<p>{el.numberNights} nights</p>

					<button
						className='inline-block bg-indigo-500 text-indigo-50 text-center rounded  uppercase w-full text-xs'
						onClick={() => handleAction(el.id)}
					>
						{el.status === 'checked-in' ? 'Check out' : 'Check in'}
					</button>
				</div>
			))}
		</div>
	);
}

export default TodayActivity;
