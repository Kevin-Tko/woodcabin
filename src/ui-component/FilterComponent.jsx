import FilterButton from './FilterButton'
import { useSearchParams } from 'react-router-dom'

function FilterComponent() {
    //using useSerchParams to set filter parameters in the URL
    const [searchParams, setSearchParams] = useSearchParams()

    //Function to set parameters as per clicked filter button
    function handleParams(value) {
        searchParams.set('discount', value)
        setSearchParams(searchParams)
    }

    return (
        <div>
            <div className="space-x-3 bg-stone-50 rounded p-1">
                <FilterButton onclick={() => handleParams('all')}>
                    All
                </FilterButton>
                <FilterButton onclick={() => handleParams('no-discount')}>
                    No Discount
                </FilterButton>
                <FilterButton onclick={() => handleParams('with-discount')}>
                    With Discount
                </FilterButton>
            </div>
        </div>
    )
}

export default FilterComponent
