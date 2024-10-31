import { useSearchParams } from 'react-router-dom'
import FilterComponent from '../../ui-component/FilterComponent'

function HeaderComponent() {
    const [searchParams] = useSearchParams()

    const value = searchParams.get('discount')

    return (
        <header className="flex flex-row items-center justify-between pb-6">
            <h2 className="text-lg font-semibold">
                {value === 'all'
                    ? 'All Cabins'
                    : value === 'no-discount'
                      ? 'Cabins without discount'
                      : 'Cabins with discount'}
            </h2>
            <FilterComponent />
        </header>
    )
}

export default HeaderComponent
