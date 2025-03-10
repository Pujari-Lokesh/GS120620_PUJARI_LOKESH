import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Store {
    id: number;
    name: string;
}

interface StoreState {
    stores: Store[];
}

const initialState: StoreState = {
    stores: []
};

const storeSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        addStore: (state, action: PayloadAction<string>) => {
            const newStore: Store = {
                id: state.stores.length + 1,
                name: action.payload
            };
            state.stores.push(newStore);
        },
        updateStore: (state, action: PayloadAction<{ id: number; name: string }>) => {
            const store = state.stores.find(s => s.id === action.payload.id);
            if (store) {
                store.name = action.payload.name;
            }
        },
        deleteStore: (state, action: PayloadAction<number>) => {
            state.stores = state.stores.filter(s => s.id !== action.payload);
        },
        reorderStores: (state, action: PayloadAction<Store[]>) => {
            state.stores = action.payload;
        }
    }
});

export const { addStore, updateStore, deleteStore, reorderStores } = storeSlice.actions;
export default storeSlice.reducer;
