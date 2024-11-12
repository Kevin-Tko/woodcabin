import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useDelete() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { isLoading: deletingBooking, mutate: bookingDelete } = useMutation({
        mutationFn: (id) => deleteBooking(id),
        onSuccess: () => {
            toast.success('Booking deleted successfully', { duration: '200' })

            queryClient.invalidateQueries({ active: true })

            navigate('/bookings')
        },
        onError: () => toast.error('failed to delete booking'),
    })

    return { deletingBooking, bookingDelete }
}
