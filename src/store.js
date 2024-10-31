import { configureStore } from '@reduxjs/toolkit'
import cabinsReducer from './features/cabins/cabinSlice'

const store = configureStore({
    reducer: { cabins: cabinsReducer },
})

export default store
