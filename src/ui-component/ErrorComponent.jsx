/* eslint-disable react/prop-types */
function ErrorComponent({ error }) {
    return (
        <div className="text-center">
            <p>{error}</p>
        </div>
    )
}

export default ErrorComponent
