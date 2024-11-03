/* eslint-disable react/prop-types */
function MenuButton({ icon, onclick, children }) {
    return (
        <div className="grid grid-cols-menulayout gap-2 items-center hover:bg-stone-300 p-1 rounded w-full">
            {icon}
            <button
                className="inline-block  justify-self-start "
                onClick={onclick}
            >
                {children}
            </button>
        </div>
    )
}

export default MenuButton
