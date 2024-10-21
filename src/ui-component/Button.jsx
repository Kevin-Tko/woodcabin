/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom'

function Button({ children, route }) {
    const navigate = useNavigate()

    return (
        <button
            className="py-1 px-2 bg-slate-500"
            onClick={() => navigate(route)}
        >
            {children}
        </button>
    )
}

export default Button
