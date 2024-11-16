import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useBookingStats } from './useBookingStats';
import { formatLineChartDate } from '../../utils/helpers';
import LoadingComponent from '../../ui-component/LoadingComponent';
import ErrorComponent from '../../ui-component/ErrorComponent';

function Sales() {
	const { bookings, isLoading, error } = useBookingStats();

	if (isLoading) return <LoadingComponent />;

	if (error) return <ErrorComponent />;

	const data = bookings
		.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
		.map((el) => {
			return { ...el, created_at: formatLineChartDate(el.created_at) };
		});

	return (
		<div className='bg-indigo-50 py-8 overflow-scroll flex flex-col justify-center items-center'>
			<h2>Sales Summary</h2>
			<LineChart width={900} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='created_at' />
				<YAxis dataKey='totalPrice' />
				<Tooltip viewBox={{ x: 0, y: 0, width: 100, height: 100 }} />
				<Legend verticalAlign='top' height={36} iconType='star' iconSize={12} />
				<Line type='monotone' dataKey='totalPrice' stroke='#364fc7' strokeWidth={2} activeDot={true} />
				<Line type='monotone' dataKey='extrasPrice' stroke='#748ffc' strokeWidth={2} activeDot={true} />
			</LineChart>
		</div>
	);
}

export default Sales;
