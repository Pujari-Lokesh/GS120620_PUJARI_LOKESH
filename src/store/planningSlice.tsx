import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlanningRow {
    id: string;
    storeId: number;
    skuId: number;
    salesUnits: number;
    price: number;
    cost: number;
}

interface PlanningState {
    planningData: PlanningRow[];
}

const initialState: PlanningState = {
    planningData: []
};

const planningSlice = createSlice({
    name: 'planning',
    initialState,
    reducers: {
        setPlanningData: (state, action: PayloadAction<PlanningRow[]>) => {
            state.planningData = action.payload;
        },
        updateSalesUnits: (state, action: PayloadAction<{ id: string; salesUnits: number }>) => {
            const row = state.planningData.find((row) => row.id === action.payload.id);
            if (row) {
                row.salesUnits = action.payload.salesUnits;
            }
        }
        
    }
});

export const { setPlanningData, updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;
