/* eslint-disable react/prop-types */
import { currConverter } from '../../services/helpers'
import { HiMiniEllipsisVertical } from 'react-icons/hi2'

import { HiOutlineEye } from 'react-icons/hi2'
import { HiOutlineTrash } from 'react-icons/hi2'

import Menu from '../../ui-component/Menu'
import { useNavigate } from 'react-router-dom'

function TableData({ booking, menuOpenId, setMenuOpenId }) {
    const navigate = useNavigate()
    //destructure cabin object
    const {
        id: bookingID,
        endDate,
        status,
        totalPrice,
        cabins,
        guests,
    } = booking

    function handleMenuOpen() {
        setMenuOpenId((currentId) =>
            currentId === bookingID ? null : bookingID,
        )
    }

    //Getting access to query Client which is defined on the APP page
    // const queryClient = useQueryClient()

    //deleting a database item
    // const { isLoading: deleting, mutate } = useMutation({
    //     mutationFn: (id) => deleteCabin(id),
    //     onSuccess: () => {
    //         toast.success('Cabin deleted successfully', { duration: '200' })

    //         queryClient.invalidateQueries({
    //             queryKey: 'cabin',
    //         })
    //     },
    //     onError: (error) => toast.error(error.message, { duration: '400' }),
    // })

    // //Deleting - handling delete mutation
    // function handleDelete() {
    //     mutate(cabinID)
    // }

    //py-2 px-3 gap-12 justify-items-center items-center text-sm font-normal font-sono
    function handleSeeDetails() {
        navigate(`/bookings/${bookingID}`)
    }
    function handleDeleteBooking() {}

    return (
        <>
            <div
                className="grid grid-cols-6 bg-stone-50 px-4 gap-12 justify-items-center rounded text-sm items-center shadow-md font-sono font-semibold"
                role="row"
            >
                <p className="justify-self-start p-1">{cabins.name}</p>
                <p className="justify-self-start p-1">{guests.name}</p>
                <p className="justify-self-start p-1">{endDate}</p>
                <p
                    className={`${status === 'checked-in' ? 'bg-green-500' : status === 'unconfirmed' ? 'bg-red-500' : 'bg-stone-400'} text-center p-1 w-full rounded-full text-stone-50`}
                >
                    {status}
                </p>
                <p className="justify-self-start p-1">
                    {currConverter(totalPrice)}
                </p>
                <div className="space-x-2  relative">
                    <button
                        className="font-bold text-lg py-1 hover:bg-stone-400 p-1 transition-all duration-700 rounded ring-1"
                        onClick={handleMenuOpen}
                    >
                        <HiMiniEllipsisVertical />
                    </button>

                    {menuOpenId === bookingID && (
                        <Menu
                            options={[
                                {
                                    action: 'See Details',
                                    Fn: handleSeeDetails,
                                    icon: <HiOutlineEye />,
                                },
                                {
                                    action: 'Delete Booking',
                                    Fn: handleDeleteBooking,
                                    icon: <HiOutlineTrash />,
                                },
                            ]}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default TableData
