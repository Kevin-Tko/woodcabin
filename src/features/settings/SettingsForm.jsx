import { getSettings, updateSettings } from '../../services/apiSettings'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function SettingsForm() {
    const queryClient = useQueryClient()
    const {
        isError: errLoading,
        isLoading: loading,
        data,
        error,
    } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
    })

    const { minNights, maxNights, maxGuests, breakFastPrice } = data ? data : {}

    const { isLoading: updating, mutate } = useMutation({
        mutationFn: (col) => updateSettings(col),
        onSuccess: () => {
            toast.success('Settings updated successfully', {
                duration: '200',
            })
            queryClient.invalidateQueries({ queryKey: 'settings' })
        },
        onError: () => toast.error(error.message, { duration: '200' }),
    })

    //on loading status
    if (loading)
        return (
            <div className="text-center">
                <p>Loading...</p>
            </div>
        )

    //if error encoutered in data fetching
    if (errLoading)
        return (
            <div className="text-center">
                <p>{error.message}</p>
            </div>
        )

    //on loading status
    if (updating)
        return (
            <div className="text-center">
                <p>Loading...</p>
            </div>
        )

    function handleEditSetting(e, name) {
        const value = e.target.value

        if (!value) return
        mutate({ [name]: value })
    }

    return (
        <div>
            <header className="flex flex-row items-center justify-between pb-6 pt-8">
                <h2 className="text-lg font-semibold">Update Settings</h2>
            </header>

            <form className="form">
                <div className="formRow">
                    <label htmlFor="minNights" className="label">
                        Minimum Nights
                    </label>
                    <input
                        type="number"
                        id="minNights"
                        name="minNights"
                        className="input"
                        defaultValue={minNights}
                        onBlur={(e) => handleEditSetting(e, 'minNights')}
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="maxNights" className="label">
                        Maximum Nights
                    </label>
                    <input
                        type="number"
                        id="maxNights"
                        name="maxNights"
                        className="input"
                        defaultValue={maxNights}
                        onBlur={(e) => handleEditSetting(e, 'maxNights')}
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="maxGuests" className="label">
                        Minimum Guests
                    </label>
                    <input
                        type="number"
                        id="maxGuests"
                        name="maxGuests"
                        className="input"
                        defaultValue={maxGuests}
                        onBlur={(e) => handleEditSetting(e, 'maxGuests')}
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="breakFastPrice" className="label">
                        Breakfast Price
                    </label>
                    <input
                        type="number"
                        id="breakFastPrice"
                        name="breakFastPrice"
                        defaultValue={breakFastPrice}
                        className="input"
                        onBlur={(e) => handleEditSetting(e, 'breakFastPrice')}
                    />
                </div>
            </form>
        </div>
    )
}

export default SettingsForm
