import FilterComponent from '../../ui-component/FilterComponent';

function HeaderComponent() {
	return (
		<header className='flex tablet:flex-row items-center justify-between pb-6 bg-indigo-50 p-2 mobile:flex-col '>
			<h2 className='text-base font-semibold font-poppins'>Dashboard</h2>
			<div className='flex flex-row gap-4 items-center'>
				<FilterComponent
					filterField='last'
					options={[
						{ value: 7, label: 'Last 7 days' },
						{ value: 30, label: 'Last 30 days' },
						{ value: 90, label: 'last 90 days' },
					]}
				/>
			</div>
		</header>
	);
}

export default HeaderComponent;
