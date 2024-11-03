import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useBookings } from './useBookings'

import TableData from './TableData'
import TableHeader from './TableHeader'
import LoadingComponent from '../../ui-component/LoadingComponent'
import ErrorComponent from '../../ui-component/ErrorComponent'
import HeaderComponent from './HeaderComponent'
import Pagination from '../../ui-component/Pagination'

function BookingsTable() {
    const [searchParams] = useSearchParams()
    //Controlling the context menu in the table rows
    const [menuOpenId, setMenuOpenId] = useState(null)

    //Using the useBookings custom hook
    const { isLoading, error, bookings, count } = useBookings()

    //if an error occurs while loading data
    if (error) return <ErrorComponent error={error.message} />

    //-------------Filter Logic-----------------//
    // const filterValue = searchParams.get('status') || 'all'

    let filterBookings = bookings

    const sortValue = searchParams.get('sortBy') || 'totalPrice-asc'

    const [field, direction] = sortValue.split('-')

    const sortModifier = direction === 'asc' ? 1 : -1

    const sortedBookings = filterBookings?.sort(
        (a, b) => (a[field] - b[field]) * sortModifier,
    )

    //-------------Sorting Logic-----------------//

    return (
        <div className="p-3 bg-stone-100">
            <HeaderComponent />

            <div
                className=" border-2 grid grid-cols-1 rounded gap-2 p-3"
                role="table"
            >
                <TableHeader />

                {isLoading ? (
                    <LoadingComponent />
                ) : (
                    <div className="flex flex-col gap-2">
                        {sortedBookings?.map((booking) => (
                            <TableData
                                key={booking.id}
                                booking={booking}
                                menuOpenId={menuOpenId}
                                setMenuOpenId={setMenuOpenId}
                            />
                        ))}
                    </div>
                )}
                <Pagination count={count} />
            </div>
        </div>
    )
}

export default BookingsTable
