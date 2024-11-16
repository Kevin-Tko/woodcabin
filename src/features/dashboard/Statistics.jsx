import { HiOutlineBriefcase } from 'react-icons/hi2';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { HiOutlineKey } from 'react-icons/hi2';

import StatisticsItem from '../../ui-component/StatisticsItem';
import { useBookingStats } from './useBookingStats';
import LoadingComponent from '../../ui-component/LoadingComponent';
import ErrorComponent from '../../ui-component/ErrorComponent';
import { formatCurrency, percentageFormatter } from '../../utils/helpers';

function Statistics() {
	const { bookings, isLoading, error } = useBookingStats();

	if (isLoading) return <LoadingComponent />;

	if (error) return <ErrorComponent />;

	const totalBookings = bookings.length;
	const totalSales = formatCurrency(bookings.map((el) => el.totalPrice).reduce((prev, curr) => prev + curr, 0));
	const status = bookings.filter((el) => el.status === 'checked-in').length;
	const occupancy = percentageFormatter(status / totalBookings);

	return (
		<div className='grid grid-cols-4 gap-6'>
			<StatisticsItem icon={<HiOutlineBriefcase />} stats={totalBookings}>
				Bookings
			</StatisticsItem>

			<StatisticsItem icon={<HiOutlineBanknotes />} stats={totalSales}>
				Sales
			</StatisticsItem>

			<StatisticsItem icon={<HiOutlineCalendarDays />} stats={status}>
				Check Ins
			</StatisticsItem>

			<StatisticsItem icon={<HiOutlineKey />} stats={occupancy}>
				Occupancy rate
			</StatisticsItem>
		</div>
	);
}

export default Statistics;
