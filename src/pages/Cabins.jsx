import AddCabinForm from '../features/cabins/AddCabinForm'
import CabinsTable from '../features/cabins/CabinsTable'
import Modal from '../ui-component/Modal'
import { addNewCabin, openModal } from '../features/cabins/cabinSlice'
import { useDispatch, useSelector } from 'react-redux'

function Cabins() {
    const modalOpen = useSelector((store) => store.cabins.openModal)
    const addCabin = useSelector((store) => store.cabins.addCabin)

    const dispatch = useDispatch()

    function handleModalOpen() {
        dispatch(openModal())
        dispatch(addNewCabin())
    }

    return (
        <div className="p-4 space-y-3 bg-stone-200">
            <CabinsTable />
            <div>
                <button
                    onClick={handleModalOpen}
                    className="bg-green-500 px-2 py-1 rounded"
                >
                    Add Cabin
                </button>
            </div>
            {modalOpen && addCabin && (
                <Modal>
                    <AddCabinForm />
                </Modal>
            )}
        </div>
    )
}

export default Cabins
