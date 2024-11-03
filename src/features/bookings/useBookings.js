import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constant'

export function useBookings() {
    const [searchParams] = useSearchParams()
    const queryClient = useQueryClient()

    //API SIDE FILTERING
    const filtervalue = searchParams.get('status')
    const filter =
        !filtervalue || filtervalue === 'all'
            ? null
            : { field: 'status', value: filtervalue, method: 'eq' }

    //API SIDE SORTING
    const sortValue = searchParams.get('sortBy') || 'totalPrice-asc'
    const [field, direction] = sortValue.split('-')
    const sortBy = { field, direction }

    //API SIDE PAGINATION
    const page = !searchParams ? 1 : Number(searchParams.get('page'))

    //QUERY
    const {
        isLoading,
        data: { bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }), //Funtion in services/apiCabin
    })

    //PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE)

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        })
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        })
    }

    return { isLoading, error, bookings, count }
}
