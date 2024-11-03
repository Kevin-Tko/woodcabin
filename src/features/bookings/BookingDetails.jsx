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

function BookingDetails() {
    const navigate = useNavigate()

    const { isLoading, booking, error } = useBooking()

    if (isLoading) return <LoadingComponent />

    const {
        id: bookingID,
        status,
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

    if (error) return <ErrorComponent />

    const daysStayed = daysToStay(startDate, endDate)
    const dates = formatedDates(startDate, endDate)
    const guests = numberGuests === 1 ? 0 : numberGuests - 1
    const totalPrice = extrasPrice ? cabinPrice + extrasPrice : cabinPrice
    const bookingDate = formatedDateTime(created_at)

    return (
        <div className="p-4 space-y-6">
            <div className="flex flex-row items-center justify-between">
                <p className="flex flex-row gap-8 items-center">
                    <span className="text-2xl font-semibold">
                        Booking #{bookingID}
                    </span>
                    <span
                        className={`${status === 'checked-in' ? 'bg-green-500' : status === 'unconfirmed' ? 'bg-red-500' : 'bg-stone-400'} px-2 rounded-full text-xs uppercase`}
                    >
                        {status}
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
                <div className="p-4 flex flex-row gap-4 justify-end">
                    {status === 'unconfirmed' && (
                        <button
                            className="inline-block py-1 px-2 bg-green-500 rounded"
                            onClick={() => navigate(`checkin/${bookingID}`)}
                        >
                            Check In
                        </button>
                    )}

                    <button className="inline-block py-1 px-2 bg-red-500 rounded">
                        Delete Booking
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

export default BookingDetails
