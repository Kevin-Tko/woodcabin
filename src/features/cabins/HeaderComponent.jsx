import { useSearchParams } from 'react-router-dom'
import FilterComponent from '../../ui-component/FilterComponent'
import SortBy from '../../ui-component/SortBy'

function HeaderComponent() {
    const [searchParams] = useSearchParams()

    const value = searchParams.get('discount') || 'all'

    return (
        <header className="flex flex-row items-center justify-between pb-6">
            <h2 className="text-lg font-semibold">
                {value === 'all'
                    ? 'All Cabins'
                    : value === 'no-discount'
                      ? 'Cabins without discount'
                      : 'Cabins with discount'}
            </h2>
            <div className="flex flex-row gap-4 items-center">
                <FilterComponent
                    filterField="discount"
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'no-discount', label: 'No Discount' },
                        { value: 'with-discount', label: 'With Discount' },
                    ]}
                />
                <SortBy
                    options={[
                        { value: 'name-asc', label: 'sort by name (a-z)' },
                        { value: 'name-desc', label: 'sort by name (z-a)' },
                        {
                            value: 'regularPrice-asc',
                            label: 'sort by price(low first)',
                        },
                        {
                            value: 'regularPrice-desc',
                            label: 'sort by price(high first)',
                        },
                        {
                            value: 'maxCapacity-asc',
                            label: 'sort by capacity(low first)',
                        },
                        {
                            value: 'maxCapacity-dec',
                            label: 'sort by capacity(high first)',
                        },
                        {
                            value: 'discount-asc',
                            label: 'sort by discount(low first)',
                        },
                        {
                            value: 'discount-dec',
                            label: 'sort by discount(high first)',
                        },
                    ]}
                />
            </div>
        </header>
    )
}

export default HeaderComponent
