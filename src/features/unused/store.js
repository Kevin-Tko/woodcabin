import { configureStore } from '@reduxjs/toolkit';
import cabinsReducer from './cabinSlice';

const store = configureStore({
	reducer: { cabins: cabinsReducer },
});

export default store;
