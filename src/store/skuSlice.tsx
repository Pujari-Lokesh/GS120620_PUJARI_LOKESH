import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SKU {
    id: number;
    name: string;
    price: number;
    cost: number;
}

interface SKUState {
    skus: SKU[];
}

const initialState: SKUState = {
    skus: []
};

const skuSlice = createSlice({
    name: 'skus',
    initialState,
    reducers: {
        // ADD SKU
        addSKU: (state, action: PayloadAction<SKU>) => {
            state.skus.push(action.payload);
        },

        // UPDATE SKU
        updateSKU: (state, action: PayloadAction<SKU>) => {
            const index = state.skus.findIndex((sku) => sku.id === action.payload.id);
            if (index !== -1) {
                state.skus[index] = action.payload;
            }
        },

        // DELETE SKU
        deleteSKU: (state, action: PayloadAction<number>) => {
            state.skus = state.skus.filter((sku) => sku.id !== action.payload);
        }
    }
});

export const { addSKU, updateSKU, deleteSKU } = skuSlice.actions;
export default skuSlice.reducer;
