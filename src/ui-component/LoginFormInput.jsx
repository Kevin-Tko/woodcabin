/* eslint-disable react/prop-types */
function LoginFormInput({ type, id, value, onchange }) {
	return (
		<input
			type={type}
			id={id}
			value={value}
			onChange={(e) => onchange(e)}
			className='rounded border-none ring-1 focus:ring-1 ring-indigo-200 px-2 py-2 bg-gray-50 focus:outline-none font-poppins text-xs font-semibold'
		/>
	);
}

export default LoginFormInput;
