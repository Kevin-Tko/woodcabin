/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { currConverter } from '../../services/helpers'
import { HiMiniEllipsisVertical } from 'react-icons/hi2'

import { deleteCabin } from '../../services/apiCabins'

function TableData({ cabin }) {
    const {
        id: cabinID,
        image,
        name,
        maxCapacity,
        regularPrice,
        discount,
    } = cabin

    //Getting access to query Client which is defined on the APP page
    const queryClient = useQueryClient()

    //deleting a database item
    const { isLoading, mutate } = useMutation({
        mutationFn: (id) => deleteCabin(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: 'cabin',
            })
            alert(`Cabin ${name} deleted successfulyy`)
        },
        onError: (error) => alert(error.message),
    })

    if (isLoading) return <p className="text-red-500">Deleting....</p>

    return (
        <div
            className="grid grid-cols-6 py-2 px-4 gap-12 justify-items-center items-center text-sm font-semibold font-sono"
            role="row"
        >
            <img src={image} alt="cabin" className="h-14" />
            <p>{name}</p>
            <p>{maxCapacity} people</p>
            <p>{currConverter(regularPrice)}</p>
            <p>{cabin.discount ? currConverter(discount) : '-'}</p>
            <div className="justify-self-end">
                <button
                    className="font-bold text-lg py-1 hover:bg-stone-400 p-1 transition-all duration-700 rounded ring-1"
                    onClick={() => mutate(cabinID)}
                >
                    <HiMiniEllipsisVertical />
                </button>
            </div>
        </div>
    )
}

export default TableData
