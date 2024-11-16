import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	openModal: false,
	deleteCabin: false,
	editCabin: false,
	addCabin: false,
};

const cabinSlice = createSlice({
	name: 'cabins',
	initialState,
	reducers: {
		openModal(state) {
			state.openModal = true;
		},
		addNewCabin(state) {
			state.addCabin = true;
		},

		deleteCabin(state) {
			state.deleteCabin = true;
			state.editCabin = false;
			state.addCabin = false;
		},
		editCabin(state) {
			state.editCabin = true;
			state.deleteCabin = false;
			state.addCabin = false;
		},
		closeModal(state) {
			state.openModal = false;
			state.deleteCabin = false;
			state.editCabin = false;
			state.addCabin = false;
		},
	},
});

export const { addNewCabin, closeModal, deleteCabin, editCabin, openModal } = cabinSlice.actions;

export default cabinSlice.reducer;
