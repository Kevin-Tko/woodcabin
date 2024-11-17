/* eslint-disable react/prop-types */
function FilterButton({ children, onclick, active }) {
	return (
		<button className={`filterButton ${active ? 'bg-indigo-500 text-indigo-50' : ''} `} onClick={onclick}>
			{children}
		</button>
	);
}

export default FilterButton;
