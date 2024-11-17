/* eslint-disable react/prop-types */
import FilterButton from './FilterButton';
import { useSearchParams } from 'react-router-dom';

function FilterComponent({ filterField, options }) {
	//using useSerchParams to set filter parameters in the URL
	const [searchParams, setSearchParams] = useSearchParams();

	//get the current filter value
	const currFilter = searchParams.get(filterField) || options.at(0).value;

	//Function to set parameters as per clicked filter button
	function handleParams(value) {
		searchParams.set(filterField, value);

		//ensures that when filtering, the page is always set to page 1
		if (searchParams.get('page')) searchParams.set('page', 1);

		setSearchParams(searchParams);
	}

	return (
		<div>
			<div className='space-x-3 bg-indigo-50 rounded p-1 ring-1 ring-indigo-300 mobile:flex mobile:flex-col tablet:block mobile:gap-2'>
				{options.map((option) => (
					<FilterButton
						onclick={() => handleParams(option.value)}
						key={option.value}
						active={currFilter == option.value}
					>
						{option.label}
					</FilterButton>
				))}
			</div>
		</div>
	);
}

export default FilterComponent;
