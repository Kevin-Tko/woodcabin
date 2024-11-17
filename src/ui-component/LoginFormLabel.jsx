/* eslint-disable react/prop-types */
function LoginFormLabel({ htmlfor, children }) {
	return (
		<label htmlFor={htmlfor} className='text-xs font-poppins font-bold'>
			{children}
		</label>
	);
}

export default LoginFormLabel;
