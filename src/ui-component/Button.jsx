/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';

export function ButtonAddCabin({ children, route }) {
	const navigate = useNavigate();

	return (
		<div>
			<button className='py-1 px-4 bg-indigo-500 rounded text-indigo-50' onClick={() => navigate(route)}>
				{children}
			</button>
		</div>
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

export function DetailsButton({ icon, children, id }) {
	const navigate = useNavigate();
	return (
		<button
			className='bg-indigo-500 lowercase flex items-center gap-1 py-1 px-3 border-none rounded text-indigo-50 font-poppins font-semibold hover:bg-indigo-300 hover:text-slate-700 transition-all duration-500'
			onClick={() => navigate(`${id}`)}
		>
			{icon}
			<span>{children}</span>
		</button>
	);
}

export function EditButton({ children, handeEdit, type, disable }) {
	return (
		<button
			className='bg-indigo-500 py-1 px-5 rounded font-poppins text-indigo-50  tracking-wider'
			onClick={handeEdit}
			type={type}
			disabled={disable}
		>
			{children}
		</button>
	);
}

export function BackButton({ children, handleBack, type, disable }) {
	return (
		<button
			className='bg-indigo-500 py-1 px-5 rounded font-poppins text-indigo-50  tracking-wider'
			onClick={handleBack}
			type={type}
			disabled={disable}
		>
			{children}
		</button>
	);
}

export function LoginFormButton({ type, disable, children }) {
	return (
		<button
			type={type}
			disabled={disable}
			className={`bg-indigo-500 block w-full py-2 rounded text-center font-poppins text-stone-50 text-xs font-bold tracking-wider ${disable ? 'cursor-not-allowed' : ''}`}
		>
			{children}
		</button>
	);
}
