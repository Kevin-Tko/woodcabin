/* eslint-disable react/prop-types */
function FilterButton({ children, onclick }) {
    return (
        <button className="filterButton" onClick={onclick}>
            {children}
        </button>
    )
}

export default FilterButton
