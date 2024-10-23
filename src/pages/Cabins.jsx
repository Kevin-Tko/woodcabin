import { useState } from 'react'
import AddCabinForm from '../features/cabins/AddCabinForm'
import CabinsTable from '../features/cabins/CabinsTable'

function Cabins() {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="p-8 space-y-3">
            <CabinsTable />
            <div>
                <button onClick={() => setShowForm((show) => !show)}>
                    Add Cabin
                </button>
                {showForm && <AddCabinForm />}
            </div>
        </div>
    )
}

export default Cabins
