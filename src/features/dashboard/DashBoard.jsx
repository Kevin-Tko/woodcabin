import HeaderComponent from './HeaderComponent';
import Sales from './Sales';
import Statistics from './Statistics';
import StayDuration from './StayDuration';
import TodayActivity from './TodayActivity';

function DashBoard() {
	return (
		<div className='flex flex-col gap-4'>
			<HeaderComponent />

			<Statistics />

			<div className='grid tablet:grid-cols-2 gap-4 mobile:grid-cols-1'>
				<TodayActivity />
				<StayDuration />
			</div>
			<Sales />
		</div>
	);
}

export default DashBoard;
