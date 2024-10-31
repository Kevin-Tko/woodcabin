/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { closeModal } from '../features/cabins/cabinSlice'

function ConfirmDelete({ handleDelete }) {
    const dispatch = useDispatch()

    function handleNoClick() {
        dispatch(closeModal())
    }

    function handleYesClick() {
        handleDelete()
        dispatch(closeModal())
    }

    return (
        <div className="p-4 bg-stone-300 space-y-3">
            <p className="font-sono text-base">
                Are you sure you want to delete ?
            </p>
            <div className="space-x-3">
                <button
                    className="inline-block px-2  bg-green-500 rounded text-sm capitalize font-semibold"
                    onClick={handleNoClick}
                >
                    No
                </button>
                <button
                    className="inline-block px-2  bg-red-500 rounded text-sm capitalize font-semibold"
                    onClick={handleYesClick}
                >
                    Yes
                </button>
            </div>
        </div>
    )
}

export default ConfirmDelete
