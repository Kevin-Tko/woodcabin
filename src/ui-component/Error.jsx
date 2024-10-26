/* eslint-disable react/prop-types */
function Error({ children }) {
    return (
        <p className="text-sm text-red-500 font-semibold font-sono ml-1">
            {children}
        </p>
    )
}

export default Error
