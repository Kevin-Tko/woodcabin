/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { addCabin, editCabin } from '../../services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { closeModal } from '../cabins/cabinSlice';

import Error from '../../ui-component/Error';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddCabinForm({ cabinToEdit = {} }) {
	const dispatch = useDispatch();
	const { id: editId, ...editValues } = cabinToEdit;

	const navigate = useNavigate();

	const isEditSession = Boolean(editId); //Check if it is editing or adding a new cabin

	const queryClient = useQueryClient();
	const { register, handleSubmit, reset, watch, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	//Get any form errors
	const { errors } = formState;

	//CREATING CABIN
	const { isLoading: isCreating, mutate: createCabin } = useMutation({
		mutationFn: (newCabin) => addCabin(newCabin),
		onSuccess: () => {
			toast.success('Cabin added successfuly', { duration: '200' });
			queryClient.invalidateQueries({ queryKey: 'cabin' });
			reset();
		},
		onError: (error) => toast.error(error.message),
	});

	//EDITING CABIN
	const { isLoading: isEditing, mutate: cabinEdit } = useMutation({
		mutationFn: ({ cabinToEdit, id }) => editCabin(cabinToEdit, id),
		onSuccess: () => {
			toast.success('Cabin successfuly edited', { duration: '200' });
			queryClient.invalidateQueries({ queryKey: 'cabin' });
			reset();
		},
		onError: (error) => toast.error(error.message),
	});

	//Submitting the form with the data captured
	function submitForm(data) {
		//check is image still exists
		const image = typeof data.image === 'string' ? data.image : data.image[0];

		if (isEditSession) {
			cabinEdit({ cabinToEdit: { ...data, image }, id: editId });

			dispatch(closeModal());
		} else {
			createCabin({ ...data, image: image });

			dispatch(closeModal());
		}

		navigate('/cabins');
	}

	//closing Modal using the cancel button
	function handleCloseModal() {
		dispatch(closeModal());
		navigate('/cabins');
	}

	return (
		<form className='form' onSubmit={handleSubmit(submitForm)}>
			<div className='formRow'>
				<label htmlFor='name' className='label'>
					Cabin name
				</label>
				<input
					type='text'
					id='name'
					className='input'
					{...register('name', {
						required: 'This is a required field',
					})}
				/>
				{errors?.name && <Error>{errors.name.message}</Error>}
			</div>

			<div className='formRow'>
				<label htmlFor='maxCapacity' className='label'>
					Maximum capacity
				</label>
				<input
					type='number'
					id='maxCapacity'
					className='input'
					{...register('maxCapacity', {
						required: 'This is a required field',
						min: {
							value: 1,
							message: 'Capacity should be atleast one',
						},
					})}
				/>
				{errors?.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
			</div>

			<div className='formRow'>
				<label htmlFor='regularPrice' className='label'>
					Regular price
				</label>
				<input
					type='number'
					id='regularPrice'
					className='input'
					{...register('regularPrice', {
						required: 'This is a required field',
						min: {
							value: 0,
							message: 'Price should be atleast KES:1',
						},
					})}
				/>
				{errors?.regularPrice && <Error>{errors.regularPrice.message}</Error>}
			</div>

			<div className='formRow'>
				<label htmlFor='discount' className='label'>
					Discount
				</label>
				<input
					type='number'
					id='discount'
					className='input'
					{...register('discount', {
						required: 'This is a required field',
						validate: (value) => {
							value < watch('regularPrice') || 'Discount should be less than the regular price';
						},
					})}
				/>
				{errors?.discount && <Error>{errors.discount.message}</Error>}
			</div>

			<div className='formRow'>
				<label htmlFor='description' className='label'>
					Description
				</label>
				<textarea
					type='text'
					id='description'
					className='input'
					{...register('description', {
						required: 'This is a required field',
					})}
				/>
				{errors?.description && <Error>{errors.description.message}</Error>}
			</div>

			<div className='formRow'>
				<label htmlFor='image' className='label'>
					Image
				</label>
				<input type='file' id='image' accept='image/*' className='input' {...register('image')} />
			</div>

			<div className='col-span-2  space-x-4 flex justify-center items-center py-1'>
				{!isEditSession && (
					<button className='formButton ' type='reset' onClick={handleCloseModal}>
						Cancel
					</button>
				)}
				<button className='formButton bg-green-500' type='submit' disabled={isCreating || isEditing}>
					{isEditSession ? 'Edit Cabin' : 'Add Cabin'}
				</button>
			</div>
		</form>
	);
}

export default AddCabinForm;
