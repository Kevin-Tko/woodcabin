import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loggedOut } from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { isLoading, mutate: logout } = useMutation({
        mutationFn: loggedOut,
        onSuccess: () => {
            queryClient.removeQueries() //removing all queries stored in the cache after logout
            toast.success('Logged out successfully. Please login')
            navigate('/login', { replace: true })
        },
    })

    return { isLoading, logout }
}
