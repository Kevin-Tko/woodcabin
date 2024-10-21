import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import AppLayout from './ui-component/AppLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Account from './pages/Account'
import Cabins from './pages/Cabins'
import Settings from './pages/Settings'
import User from './pages/User'
import PageNotFound from './pages/PageNotFound'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000,
            staleTime: 0,
        },
    },
})

function App() {
    return (
        //Creating a router using BrowserRouter
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
                <Routes>
                    {/* Applayout encloses all other routes except login and error route */}
                    <Route element={<AppLayout />}>
                        {/* Child routes inside app layout start here */}
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route path="account" element={<Account />} />
                        <Route path="cabins" element={<Cabins />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="user" element={<User />} />
                        {/* Child routes inside app layout end here */}
                    </Route>
                    {/* login page/ route and error rout will be on a differnt page and not under App layout */}
                    <Route path="login" element={<Login />} />
                    {/* this wildcard path will catch all other erroneous routes that are not defined */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
