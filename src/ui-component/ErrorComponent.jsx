/* eslint-disable react/prop-types */
function ErrorComponent({ error, resetErrorBoundary }) {
	return (
		<div className='bg-indigo-200 w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-11 flex flex-col items-center justify-center space-y-4'>
			<p>Something went wrong 😔</p>
			<p>{error}</p>
			<button
				className='bg-indigo-500 text-indigo-50 tracking-wider px-4 py-2 block rounded'
				onClick={resetErrorBoundary}
			>
				Try Again
			</button>
		</div>
	);
}

export default ErrorComponent;
