import { useSearchParams } from 'react-router-dom'
import SelectComponent from './SelectComponent'

/* eslint-disable react/prop-types */
function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const currSelectedValue = searchParams.get('sortBy') || ''

    function handleChange(e) {
        searchParams.set('sortBy', e.target.value)
        setSearchParams(searchParams)
    }

    return (
        <SelectComponent
            options={options}
            onchange={handleChange}
            value={currSelectedValue}
        />
    )
}

export default SortBy
