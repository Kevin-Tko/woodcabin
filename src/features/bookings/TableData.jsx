/* eslint-disable react/prop-types */
import { currConverter } from '../../services/helpers'
import { HiMiniEllipsisVertical } from 'react-icons/hi2'

import { HiOutlineEye } from 'react-icons/hi2'

import Menu from '../../ui-component/Menu'
import { useNavigate } from 'react-router-dom'

import { daysToStay } from '../../utils/helpers'

function TableData({ booking, menuOpenId, setMenuOpenId }) {
    const navigate = useNavigate()
    //destructure cabin object
    const {
        id: bookingID,
        endDate,
        startDate,
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

    function handleSeeDetails() {
        navigate(`/bookings/${bookingID}`)
    }

    return (
        <>
            <div
                className="grid grid-cols-8 bg-stone-50 px-4 gap-12 pr-2 justify-items-center rounded text-xs items-center shadow-md font-poppins font-semibold py-3"
                role="row"
            >
                <p className="justify-self-start p-1">{cabins.name}</p>
                <p className="justify-self-start p-1 col-span-2">
                    {guests.name}
                </p>
                <p className="justify-self-start p-1">
                    {`${daysToStay(startDate, endDate)} Days`}
                </p>
                <p
                    className={`${status === 'checked-in' ? 'bg-green-500' : status === 'unconfirmed' ? 'bg-red-500' : 'bg-stone-400'} text-center px-3 py-1 text-xs rounded-full text-stone-50 col-span-2 justify-self-center`}
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
                            ]}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default TableData
