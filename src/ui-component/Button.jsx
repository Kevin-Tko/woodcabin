/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';

export function Button({ children, route }) {
	const navigate = useNavigate();

	return (
		<button className='py-1 px-2 bg-slate-500' onClick={() => navigate(route)}>
			{children}
		</button>
	);
}

export function HeaderButton({ children, disabled, onclick }) {
	return (
		<button
			disabled={disabled}
			onClick={onclick}
			className='text-indigo-500 inline-block p-1 border-none font-semibold text-xl hover:text-indigo-700 transition-all duration-500'
		>
			{children}
		</button>
	);
}
