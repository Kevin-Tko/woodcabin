/* eslint-disable react/prop-types */
//Value in select is important for determining the selected option
function SelectComponent({ options, value, onchange }) {
	return (
		<div>
			<select
				value={value}
				className='outline-none focus:ring-1 border-none rounded ring-1 ring-indigo-300 p-1 font-poppins text-xs bg-gray-50 cursor-pointer'
				onChange={onchange}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value} className='text-xs bg-indigo-400'>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default SelectComponent;
