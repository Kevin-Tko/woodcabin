import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { useBookingStats } from './useBookingStats';
import LoadingComponent from '../../ui-component/LoadingComponent';
import ErrorComponent from '../../ui-component/ErrorComponent';
import { groupNights } from '../../utils/helpers';

function StayDuration() {
	const { bookings, isLoading, error } = useBookingStats();

	if (isLoading) return <LoadingComponent />;

	if (error) return <ErrorComponent />;

	//
	let data = bookings.map((el) => {
		return {
			...el,
			duration: groupNights(el.numberNights).duration,
			color: groupNights(el.numberNights).color,
			value: groupNights(el.numberNights).value,
		};
	});
	data = data.reduce((acc, curr) => {
		// Check if the current duration already exists in the accumulator
		const existing = acc.find((item) => item.duration === curr.duration);

		if (existing) {
			// If it exists, increment the count (value)
			existing.value += 1;
		} else {
			// If it doesn't exist, add a new entry
			acc.push({ duration: curr.duration, color: curr.color, value: 1 });
		}

		return acc;
	}, []);

	return (
		<div className='bg-indigo-50 flex flex-col items-center justify-center p-2 overflow-scroll'>
			<h2>Stay duration summary</h2>
			<PieChart width={500} height={250}>
				{/* <Pie data={bookings} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={50} fill='#8884d8' /> */}
				<Pie
					data={data}
					dataKey='value'
					nameKey='duration'
					cx='50%'
					cy='50%'
					innerRadius={70}
					outerRadius={100}
					paddingAngle={3}
				>
					{data.map((el) => (
						<Cell fill={el.color} key={el.color} stroke={el.color} />
					))}
				</Pie>
				<Legend
					verticalAlign='middle'
					align='right'
					width='30%'
					layout='vertical'
					iconType='circle'
					iconSize={12}
				/>
				<Tooltip viewBox={{ x: 0, y: 0, width: 100, height: 100 }} />
			</PieChart>
		</div>
	);
}

export default StayDuration;
