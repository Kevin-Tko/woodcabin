/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../../ui-component/LoadingComponent'
import { useUser } from './useUser'
import { useEffect } from 'react'

function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    //1.Load authenticated user
    // eslint-disable-next-line no-unused-vars
    const { isLoading, user, isAuthenticated } = useUser()

    //2.If no autheticated user and app is not loading, redirect to Login page
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate('/login')
        },
        [isAuthenticated, isLoading, navigate],
    )

    //3.While loading show a spinner
    if (isLoading) return <LoadingComponent />

    //4.If there is a user, render the app

    if (isAuthenticated) return children
}
export default ProtectedRoute
