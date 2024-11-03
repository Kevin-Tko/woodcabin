import { HiOutlineArrowLongLeft } from 'react-icons/hi2'
import { HiOutlineHomeModern } from 'react-icons/hi2'
import { HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import { HiOutlineXCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useBooking } from './useBooking'
import {
    daysToStay,
    formatedDates,
    formatCurrency,
    formatedDateTime,
} from '../../utils/helpers'
import LoadingComponent from '../../ui-component/LoadingComponent'
import ErrorComponent from '../../ui-component/ErrorComponent'
import { useEffect, useState } from 'react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { updateBooking } from '../../services/apiBookings'
// import toast from 'react-hot-toast'

function CheckinDetails() {
    const [confirmPaid, setConfirmPaid] = useState(false)
    const navigate = useNavigate()
    // const queryClient = useQueryClient()

    const { isLoading, booking, error } = useBooking()

    console.log(booking)

    useEffect(
        function () {
            setConfirmPaid(booking?.isPaid ?? false)
        },
        [booking?.isPaid],
    )

    // const { isLoading: updating, mutate } = useMutation({
    //     mutationFn: (id, options) => updateBooking(id, options),
    //     onSuccess: () => {
    //         toast.success('Guest checked in successfully', { duration: '200' })
    //         queryClient.invalidateQueries({
    //             queryKey: 'bookings',
    //         })
    //     },
    //     onError: (error) =>
    //         toast.error(`Failed to checkin guest:${error.message}`, {
    //             duration: '200',
    //         }),
    // })

    if (isLoading) return <LoadingComponent />

    const {
        id: bookingID,
        startDate,
        endDate,
        numberGuests,
        hasBreakfast,
        cabinPrice,
        extrasPrice,
        isPaid,
        created_at,
        cabins: { name: cabinName },
        guests: { name: guestName, email, nationalID, countryFlag },
    } = booking[0]

    console.log(guestName, email)

    if (error) return <ErrorComponent />

    const daysStayed = daysToStay(startDate, endDate)
    const dates = formatedDates(startDate, endDate)
    const guests = numberGuests === 1 ? 0 : numberGuests - 1
    const totalPrice = extrasPrice ? cabinPrice + extrasPrice : cabinPrice
    const bookingDate = formatedDateTime(created_at)

    // function handleUpdatePaid(options) {
    //     mutate(bookingID, options)
    // }

    // function handleCheckin(options) {
    //     const option = JSON.stringify(options)
    //     mutate(bookingID, option)
    //     navigate('/bookings')
    // }

    return (
        <div className="p-4 space-y-6">
            <div className="flex flex-row items-center justify-between">
                <p>
                    <span className="text-2xl font-semibold">
                        Checkin #{bookingID}
                    </span>
                </p>
                <button
                    className="flex flex-row gap-3 items-center ring-1 rounded ring-stone-50 p-1"
                    onClick={() => navigate(-1)}
                >
                    <span>
                        <HiOutlineArrowLongLeft />
                    </span>
                    <span>Back</span>
                </button>
            </div>
            <div className="space-y-6 bg-stone-200 rounded-lg">
                <div className="flex flex-row items-center justify-between bg-green-500 p-4 text-stone-50">
                    <p className="flex flex-row items-center gap-4 text-sm">
                        <span className="text-2xl">
                            <HiOutlineHomeModern />
                        </span>
                        <span>
                            {daysStayed} nights in Cabin {cabinName}
                        </span>
                    </p>
                    <p className="text-sm">
                        {dates.formattedSD} &mdash; {dates.formattedED}
                    </p>
                </div>
                <div className="p-4 space-y-6">
                    <p className="flex flex-row gap-4 items-center text-sm">
                        <span className="rounded">
                            <img
                                src={countryFlag}
                                alt="country flag"
                                className="h-3 rounded"
                            />
                        </span>
                        <span>
                            {guestName} {guests ? `+ ${guests} guests` : ''}{' '}
                            &bull; {email} &bull; National ID: {nationalID}1
                        </span>
                    </p>
                    <p className="flex flex-row gap-4 items-center text-sm">
                        <span
                            className={
                                hasBreakfast ? 'text-green-500' : 'text-red-500'
                            }
                        >
                            {hasBreakfast ? (
                                <HiOutlineCheckCircle />
                            ) : (
                                <HiOutlineXCircle />
                            )}
                        </span>
                        <span>Breakfast included?</span>
                        <span>{hasBreakfast ? 'Yes' : 'No'}</span>
                    </p>
                    <div
                        className={`flex flex-row justify-between items-center py-2 px-1 rounded text-sm ${isPaid ? 'bg-green-200' : 'bg-red-200'}`}
                    >
                        <p className="flex flex-row gap-4 items-center">
                            <span>
                                <HiOutlineCurrencyDollar />
                            </span>
                            <span>Total price</span>
                            <span>
                                {`${formatCurrency(totalPrice)} (${formatCurrency(cabinPrice)} cabin ${extrasPrice ? `+${formatCurrency(extrasPrice)}` : ''})`}
                            </span>
                        </p>
                        <p>{isPaid ? 'Paid' : 'Not Paid'}</p>
                    </div>
                    <p className="text-right">Booked {bookingDate}</p>
                </div>
                <div className="px-6 flex flex-row gap-4 items-center">
                    <input
                        type="checkbox"
                        value={confirmPaid}
                        onChange={() => setConfirmPaid((confirm) => !confirm)}
                        id="confirm"
                    />
                    <label>
                        I confirm that {guestName} has paid the total amount of{' '}
                        {formatCurrency(totalPrice)}
                    </label>
                </div>
                <div className="p-4 flex flex-row gap-4 justify-end">
                    <button className="inline-block py-1 px-2 bg-green-500 rounded">
                        Check In booking #{bookingID}
                    </button>

                    <button
                        className="inline-block py-1 px-2 ring-1 ring-stone-400 rounded"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckinDetails
