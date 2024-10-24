import { useForm } from 'react-hook-form'
import { addCabin } from '../../services/apiCabins'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

function AddCabinForm() {
    const queryClient = useQueryClient()
    const { register, handleSubmit, reset, getValues, formState } = useForm()
    const { errors } = formState

    const { isLoading, mutate } = useMutation({
        mutationFn: (newCabin) => addCabin(newCabin),
        onSuccess: () => {
            toast.success('Cabin added successfuly', { duration: '200' })

            queryClient.invalidateQueries({ queryKey: 'cabin' })

            reset()
        },
        onError: (error) => toast.error(error.message),
    })

    function submitForm(data) {
        mutate(data)
    }

    function onError(errors) {
        console.log(errors)
    }

    return (
        <form className="form" onSubmit={handleSubmit(submitForm, onError)}>
            <div className="formRow">
                <label htmlFor="name" className="label">
                    Cabin name
                </label>
                <input
                    type="text"
                    id="name"
                    className="input"
                    {...register('name', {
                        required: 'This is a required field',
                    })}
                />
                {errors?.name && (
                    <p className="text-sm text-red-500 font-semibold font-sono ml-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="formRow">
                <label htmlFor="maxCapacity" className="label">
                    Maximum capacity
                </label>
                <input
                    type="number"
                    id="maxCapacity"
                    className="input"
                    {...register('maxCapacity', {
                        required: 'This is a required field',
                        min: {
                            value: 1,
                            message: 'Capacity should be atleast one',
                        },
                    })}
                />
            </div>

            <div className="formRow">
                <label htmlFor="regularPrice" className="label">
                    Regular price
                </label>
                <input
                    type="number"
                    id="regularPrice"
                    className="input"
                    {...register('regularPrice', {
                        required: 'This is a required field',
                        min: {
                            value: 100,
                            message: 'Price should be atleast KES:100',
                        },
                    })}
                />
            </div>

            <div className="formRow">
                <label htmlFor="discount" className="label">
                    Discount
                </label>
                <input
                    type="number"
                    id="discount"
                    className="input"
                    {...register('discount', {
                        required: 'This is a required field',
                        min: {
                            validate: (value) =>
                                value <= getValues().regularPrice ||
                                'Discount should be less than the regular price',
                        },
                    })}
                />
            </div>

            <div className="formRow">
                <label htmlFor="description" className="label">
                    Description
                </label>
                <textarea
                    type="text"
                    id="description"
                    className="input"
                    {...register('description', {
                        required: 'This is a required field',
                    })}
                />
            </div>

            <div className="formRow">
                <label htmlFor="image" className="label">
                    Image
                </label>
                <input
                    type="text"
                    id="image"
                    accept="image/*"
                    className="input"
                    {...register('image')}
                />
            </div>

            <div className="col-span-2  space-x-4 flex justify-center items-center py-1">
                <button className="formButton " type="reset">
                    Cancel
                </button>
                <button
                    className="formButton bg-green-500"
                    type="submit"
                    disabled={isLoading}
                >
                    Add Cabin
                </button>
            </div>
        </form>
    )
}

export default AddCabinForm
