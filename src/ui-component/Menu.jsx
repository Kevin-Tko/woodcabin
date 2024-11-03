/* eslint-disable react/prop-types */
// import { HiOutlinePencil } from 'react-icons/hi2'
// import { HiOutlineTrash } from 'react-icons/hi2'
// import { useDispatch } from 'react-redux'

// import MenuButton from './MenuButton'
// import {
//     deleteCabin,
//     editCabin,
//     openModal,
// } from '../features/cabins/cabinSlice'

function Menu({ options }) {
    // const dispatch = useDispatch()

    // function handleEdit() {
    //     dispatch(openModal())
    //     dispatch(editCabin())
    // }

    // function handleDelete() {
    //     dispatch(openModal())
    //     dispatch(deleteCabin())
    // }

    return (
        <>
            <div className="bg-stone-200 absolute -left-40 -bottom-20 shadow-md p-1 text-sm font-semibold font-sono text-stone-500 z-50 space-y-2 rounded block">
                {/* <MenuButton icon={<HiOutlinePencil />} onclick={handleEdit}>
                    {action1}
                </MenuButton>

                <MenuButton icon={<HiOutlineTrash />} onclick={handleDelete}>
                    {action2}
                </MenuButton> */}
                {options.map((option) => (
                    <div
                        className="grid grid-cols-menulayout gap-2 items-center hover:bg-stone-300 p-1 rounded w-full"
                        key={option.action}
                    >
                        {option.icon}
                        <button
                            className="inline-block  justify-self-start "
                            onClick={option.Fn}
                            key={option.action}
                        >
                            {option.action}
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Menu

// function Menu({ handleModalOpen, deleting, handleIsDelete, handleIsEdit }) {

//     return (
//         <div className="bg-stone-200 absolute -left-20 -bottom-20 shadow-md p-1 text-sm font-semibold font-sono text-stone-500 z-50 space-y-2 rounded">
//             <div className="grid grid-cols-menulayout gap-2 items-center hover:bg-stone-300 p-1 rounded">
//                 <HiOutlinePencil />
//                 <button
//                     className="inline-block  justify-self-start "
//                     onClick={() => {
//                         handleModalOpen()
//                         handleIsEdit()
//                     }}
//                     disabled={deleting}
//                 >
//                     Edit
//                 </button>
//             </div>

//             <div className="grid grid-cols-menulayout gap-2 items-center hover:bg-stone-300 p-1 rounded">
//                 <HiOutlineTrash />
//                 <button
//                     className="inline-block items-center justify-self-start "
//                     onClick={() => {
//                         handleModalOpen()
//                         handleIsDelete()
//                     }}
//                     disabled={deleting}
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Menu
