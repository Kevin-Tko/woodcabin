/* eslint-disable react/prop-types */
function FilterButton({ children, onclick, active }) {
    return (
        <button
            className={`filterButton ${active ? 'bg-green-500' : ''}`}
            onClick={onclick}
        >
            {children}
        </button>
    )
}

export default FilterButton
