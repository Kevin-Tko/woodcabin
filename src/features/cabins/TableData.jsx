/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { currConverter } from '../../services/helpers'
import { HiMiniEllipsisVertical } from 'react-icons/hi2'

import { deleteCabin } from '../../services/apiCabins'
import AddCabinForm from './AddCabinForm'
import Modal from '../../ui-component/Modal'
import Menu from '../../ui-component/Menu'
import ConfirmDelete from '../../ui-component/ConfirmDelete'
import { useSelector } from 'react-redux'

function TableData({ cabin, menuOpenId, setMenuOpenId }) {
    const openModal = useSelector((store) => store.cabins.openModal)
    const deleteCabinState = useSelector((store) => store.cabins.deleteCabin)
    const editCabinState = useSelector((store) => store.cabins.editCabin)

    //destructure cabin object
    const {
        id: cabinID,
        image,
        name,
        maxCapacity,
        regularPrice,
        discount,
    } = cabin

    function handleMenuOpen() {
        setMenuOpenId((currentId) => (currentId === cabinID ? null : cabinID))
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

    //Deleting - handling delete mutation
    function handleDelete() {
        mutate(cabinID)
    }

    return (
        <>
            <div
                className="grid grid-cols-6 py-2 px-4 gap-12 justify-items-center items-center text-sm font-semibold font-sono bg-stone-50 rounded shadow-md"
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
                <div className="justify-self-end space-x-2  relative">
                    <button
                        className="font-bold text-lg py-1 hover:bg-stone-400 p-1 transition-all duration-700 rounded ring-1"
                        onClick={handleMenuOpen}
                    >
                        <HiMiniEllipsisVertical />
                    </button>

                    {menuOpenId === cabinID && <Menu deleting={deleting} />}
                </div>
            </div>

            {openModal && deleteCabinState && (
                <Modal>
                    <ConfirmDelete handleDelete={handleDelete} />,
                </Modal>
            )}
            {openModal && editCabinState && (
                <Modal>
                    <AddCabinForm cabinToEdit={cabin} />
                </Modal>
            )}
        </>
    )
}

export default TableData
