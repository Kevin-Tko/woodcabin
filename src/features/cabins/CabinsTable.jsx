import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'

import TableData from './TableData'
import TableHeader from './TableHeader'

function CabinsTable() {
    //qerying data from the DB
    const { isError, isLoading, data, error } = useQuery({
        queryKey: ['cabin'],
        queryFn: getCabins, //Funtion in services/apiCabin
    })

    //on loading status
    if (isLoading)
        return (
            <div className="text-center">
                <p>Loading...</p>
            </div>
        )

    //if error encoutered in data fetching
    if (isError)
        return (
            <div className="text-center">
                <p>{error.message}</p>
            </div>
        )

    return (
        <div>
            <header className="flex flex-row items-center justify-between pb-6">
                <h2 className="text-lg font-semibold">All Cabins</h2>
                <div>Sorting items</div>
            </header>

            <div
                className="bg-stone-100 border-2 grid grid-cols-1 rounded"
                role="table"
            >
                <TableHeader />

                <div className="divide-y-2">
                    {data?.map((cabin) => (
                        <TableData key={cabin.id} cabin={cabin} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CabinsTable
