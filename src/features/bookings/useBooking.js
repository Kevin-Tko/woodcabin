import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

export function useBooking() {
    const { bookingID } = useParams()

    if (!bookingID)
        console.log(`Useparams in useBooking hook could not find bookingId `)

    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ['booking', bookingID],
        queryFn: () => getBooking(bookingID),
    })

    return { isLoading, booking, error }
}
