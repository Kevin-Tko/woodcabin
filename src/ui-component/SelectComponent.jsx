/* eslint-disable react/prop-types */
//Value in select is important for determining the selected option
function SelectComponent({ options, value, onchange }) {
    return (
        <div>
            <select
                value={value}
                className="outline-none focus:outline-none border-none rounded ring-2 ring-stone-300 p-1"
                onChange={onchange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectComponent
