/* eslint-disable react/prop-types */
import FilterButton from './FilterButton'
import { useSearchParams } from 'react-router-dom'

function FilterComponent({ filterField, options }) {
    //using useSerchParams to set filter parameters in the URL
    const [searchParams, setSearchParams] = useSearchParams()

    //get the current filter value
    const currFilter = searchParams.get(filterField) || options.at(0).value

    //Function to set parameters as per clicked filter button
    function handleParams(value) {
        searchParams.set(filterField, value)
        setSearchParams(searchParams)
    }

    return (
        <div>
            <div className="space-x-3 bg-stone-50 rounded p-1 ring-2 ring-stone-300">
                {options.map((option) => (
                    <FilterButton
                        onclick={() => handleParams(option.value)}
                        key={option.value}
                        active={currFilter === option.value}
                    >
                        {option.label}
                    </FilterButton>
                ))}
            </div>
        </div>
    )
}

export default FilterComponent
