/* eslint-disable react/prop-types */
function StatisticsItem({ children, icon, stats }) {
	return (
		<div className='flex tablet:flex-row items-center justify-center p-3 bg-indigo-50 gap-8 rounded'>
			<div className='text-3xl bg-indigo-200 p-3 rounded-full text-indigo-600'>{icon}</div>
			<div className='text-xs font-poppins flex flex-col gap-1'>
				<p>{children}</p>
				<p className='font-bold text-indigo-600'>{stats}</p>
			</div>
		</div>
	);
}

export default StatisticsItem;
