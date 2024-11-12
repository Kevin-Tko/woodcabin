import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// import TableData from './TableData'
import TableHeader from './TableHeader'
import LoadingComponent from '../../ui-component/LoadingComponent'
import ErrorComponent from '../../ui-component/ErrorComponent'
import HeaderComponent from './HeaderComponent'
import Table from '../../ui-component/Table'

function CabinsTable() {
    const [searchParams] = useSearchParams()
    //Controlling the context menu in the table rows
    const [menuOpenId, setMenuOpenId] = useState(null)

    //-----------Data Quering Logic fron supaBase DB------------//
    const { isError, isLoading, data, error } = useQuery({
        queryKey: ['cabin'],
        queryFn: getCabins, //Funtion in services/apiCabin
    })
    //if data is loading
    if (isLoading) return <LoadingComponent />
    //if an error occurs while loading data
    if (isError) return <ErrorComponent error={error.message} />
    //-----------Data Quering Logic fron supaBase DB------------//

    //-------------Filter Logic-----------------//
    const filterValue = searchParams.get('discount') || 'all'

    let filterCabins
    if (filterValue === 'all') filterCabins = data
    if (filterValue === 'no-discount')
        filterCabins = data.filter((cabin) => cabin.discount === 0)
    if (filterValue === 'with-discount')
        filterCabins = data.filter((cabin) => cabin.discount !== 0)
    //-------------Filter Logic-----------------//

    //-------------Sorting Logic-----------------//
    const sortValue = searchParams.get('sortBy') || 'name-asc'

    const [field, direction] = sortValue.split('-')

    const sortModifier = direction === 'asc' ? 1 : -1

    const sortedCabins = filterCabins?.sort(
        (a, b) => (a[field] - b[field]) * sortModifier,
    )

    //-------------Sorting Logic-----------------//

    console.log(sortedCabins)

    if (sortedCabins) {
        sortedCabins.map((cabin) => <Table cabin={cabin} key={cabin.id}/>)
    }

    return (

        <div className="p-3 bg-stone-100">
            <HeaderComponent />

            <div
                className=" border-2 grid grid-cols-1 rounded gap-2 p-3"
                role="table"
            >
                <TableHeader />

                <div className="flex flex-col gap-2">
                    {sortedCabins?.map((cabin) =>( 
                        
                        <TableData
                            key={cabin.id}
                            cabin={cabin}
                            menuOpenId={menuOpenId}
                            setMenuOpenId={setMenuOpenId}
                        />
                    )
                )}
                </div>
            </div>
        </div>
   
    )
}

export default CabinsTable
