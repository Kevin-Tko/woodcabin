/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useState } from 'react'

import { currConverter } from '../../services/helpers'
import { HiMiniEllipsisVertical } from 'react-icons/hi2'

import { deleteCabin } from '../../services/apiCabins'
import AddCabinForm from './AddCabinForm'

function TableData({ cabin }) {
    const [showFormEdit, setShowFormEdit] = useState(false)

    //destructure cabin object
    const {
        id: cabinID,
        image,
        name,
        maxCapacity,
        regularPrice,
        discount,
    } = cabin

    //Toggling edit form
    function handleFormEdit() {
        setShowFormEdit((show) => !show)
    }

    //Getting access to query Client which is defined on the APP page
    const queryClient = useQueryClient()

    //deleting a database item
    const { isLoading: deleting, mutate } = useMutation({
        mutationFn: (id) => deleteCabin(id),
        onSuccess: () => {
            toast.success('Cabin deleted successfully', { duration: '200' })

            queryClient.invalidateQueries({
                queryKey: 'cabin',
            })
        },
        onError: (error) => toast.error(error.message, { duration: '400' }),
    })

    return (
        <>
            <div
                className="grid grid-cols-6 py-2 px-4 gap-12 justify-items-center items-center text-sm font-semibold font-sono"
                role="row"
            >
                <img src={image} alt="cabin" className="h-14" />
                <p>{name}</p>
                <p>{maxCapacity} people</p>
                <p>{currConverter(regularPrice)}</p>
                <p>
                    {cabin.discount ? (
                        currConverter(discount)
                    ) : (
                        <span>&mdash;</span>
                    )}
                </p>
                <div className="justify-self-end space-x-2">
                    <button
                        className="p-1 bg-stone-400"
                        onClick={handleFormEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="font-bold text-lg py-1 hover:bg-stone-400 p-1 transition-all duration-700 rounded ring-1"
                        disabled={deleting}
                        onClick={() => mutate(cabinID)}
                    >
                        <HiMiniEllipsisVertical />
                    </button>
                </div>
            </div>
            {showFormEdit && <AddCabinForm cabinToEdit={cabin} />}
        </>
    )
}

export default TableData
