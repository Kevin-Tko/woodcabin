import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCabin } from './useCabin';

import Error from '../../ui-component/Error';
import { BackButton, EditButton } from '../../ui-component/Button';
import { useEdit } from './useEdit';

function EditCabinForm() {
	const navigate = useNavigate();

	//Get the cabin being viewed in the details page from the use Cabin custom hook
	const { oneCabin } = useCabin();
	const cabin = oneCabin ? { ...oneCabin[0] } : {};
	const { id } = cabin;

	//Set default values to useForm to ensure the form is already filled on editing
	const { register, handleSubmit, watch, formState } = useForm({ defaultValues: cabin });

	//Get any form errors
	const { errors } = formState;

	//EDITING CABIN
	const { isLoading, mutate } = useEdit();

	//Submitting the form with the data captured
	function submitForm(data) {
		//check is image still exists
		const image = typeof data.image === 'string' ? data.image : data.image[0];

		mutate({ cabin: { ...data, image }, id: id });
		navigate(-1);
	}

	//Handle back button
	function handleBack() {
		navigate(-1);
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
				<BackButton handleBack={handleBack} type='reset' disable={isLoading}>
					Back
				</BackButton>
				<EditButton type='submit' disable={isLoading}>
					Submit
				</EditButton>
			</div>
		</form>
	);
}

export default EditCabinForm;
