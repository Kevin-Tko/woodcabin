import { useSearchParams } from 'react-router-dom'
import FilterComponent from '../../ui-component/FilterComponent'
import SortBy from '../../ui-component/SortBy'

function HeaderComponent() {
    const [searchParams] = useSearchParams()

    const value = searchParams.get('status') || 'all'

    return (
        <header className="flex flex-row items-center justify-between pb-6">
            <h2 className="text-lg font-semibold">
                {value === 'all'
                    ? 'All Bookings'
                    : value === 'checked-in'
                      ? 'Checked in guests'
                      : value === 'checked-out'
                        ? 'Checked out guests'
                        : 'Unconfirmed guests'}
            </h2>
            <div className="flex flex-row gap-4 items-center">
                <FilterComponent
                    filterField="status"
                    options={[
                        { value: 'all', label: 'All' },
                        { value: 'checked-in', label: 'Checked In' },
                        { value: 'checked-out', label: 'Checked Out' },
                        { value: 'unconfirmed', label: 'unconfirmed' },
                    ]}
                />
                <SortBy
                    options={[
                        {
                            value: 'totalPrice-asc',
                            label: 'sort by total Price (Low First)',
                        },
                        {
                            value: 'totalPrice-desc',
                            label: 'sort by total Price (High First)',
                        },
                        // {
                        //     value: 'date-asc',
                        //     label: 'sort by date (earliest first)',
                        // },
                        // {
                        //     value: 'date-desc',
                        //     label: 'sort by date (recent first)',
                        // },
                    ]}
                />
            </div>
        </header>
    )
}

export default HeaderComponent
