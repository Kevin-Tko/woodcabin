/* eslint-disable react/prop-types */
//REACT IMPORTS
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

//REACT ICONS IMPORTS
import { HiMiniEllipsisVertical } from 'react-icons/hi2'
import { HiOutlinePencil } from 'react-icons/hi2'
import { HiOutlineTrash } from 'react-icons/hi2'

//FILES IMPORT
import { currConverter } from '../../services/helpers'
import { deleteCabin as cabinDelete } from '../../services/apiCabins'
import AddCabinForm from './AddCabinForm'
import Modal from '../../ui-component/Modal'
import Menu from '../../ui-component/Menu'
import ConfirmDelete from '../../ui-component/ConfirmDelete'
import { deleteCabin, editCabin, openModal } from './cabinSlice'

function TableData({ cabin, menuOpenId, setMenuOpenId }) {
    const dispatch = useDispatch()
    const modalOpen = useSelector((store) => store.cabins.openModal)
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
    // eslint-disable-next-line no-unused-vars
    const { isLoading: deleting, mutate } = useMutation({
        mutationFn: (id) => cabinDelete(id),
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

    //
    function handleEdit() {
        console.log('edit')
        dispatch(openModal())
        dispatch(editCabin())
    }

    function handleDeleteItem() {
        dispatch(openModal())
        dispatch(deleteCabin())
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

                    {menuOpenId === cabinID && (
                        <Menu
                            options={[
                                {
                                    action: 'edit',
                                    Fn: handleEdit,
                                    icon: <HiOutlinePencil />,
                                },
                                {
                                    action: 'delete',
                                    Fn: handleDeleteItem,
                                    icon: <HiOutlineTrash />,
                                },
                            ]}
                        />
                        // <Menu
                        //     deleting={deleting}
                        //     action1="edit"
                        //     action2="delete"
                        // />
                    )}
                </div>
            </div>

            {modalOpen && deleteCabinState && (
                <Modal>
                    <ConfirmDelete handleDelete={handleDelete} />,
                </Modal>
            )}
            {modalOpen && editCabinState && (
                <Modal>
                    <AddCabinForm cabinToEdit={cabin} />
                </Modal>
            )}
        </>
    )
}

export default TableData
