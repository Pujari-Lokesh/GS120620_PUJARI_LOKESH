import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './storeSlice';
import skuReducer from './skuSlice';
import planningReducer from './planningSlice';

const store = configureStore({
    reducer: {
        stores: storeReducer,
        skus: skuReducer,
        planning: planningReducer,  // ✅ Added here
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
