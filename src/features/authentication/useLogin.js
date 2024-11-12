import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function useLogin() {
    const navigate = useNavigate()

    const { isLoading: loggingIn, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginUser({ email, password }),
        onSuccess: () => {
            toast.success('Logged in succefully', { duration: '100' })
            navigate('/dashboard', { replace: true })
        },
        onError: (err) => toast.error(err.message),
    })

    return { loggingIn, login }
}
