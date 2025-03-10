import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setPlanningData, updateSalesUnits } from '../store/planningSlice';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ValueGetterParams } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface PlanningRow {
    id: string;
    storeId: number;
    skuId: number;
    salesUnits: number;
    price: number;
    cost: number;
}

const Planning: React.FC = () => {
    const dispatch = useDispatch();
    const stores = useSelector((state: RootState) => state.stores.stores);
    const skus = useSelector((state: RootState) => state.skus.skus);
    const planningData = useSelector((state: RootState) => state.planning.planningData);

    useEffect(() => {
        if (stores.length > 0 && skus.length > 0) {
            const initialData: PlanningRow[] = stores.flatMap((store) =>
                skus.map((sku) => ({
                    id: `${store.id}-${sku.id}`,
                    storeId: store.id,
                    skuId: sku.id,
                    salesUnits: 0,
                    price: sku.price,
                    cost: sku.cost,
                }))
            );
            console.log('🟢 Generated Planning Data:', initialData); // 🔎 Debug Log
            dispatch(setPlanningData(initialData));
        }
    }, [stores, skus, dispatch]);
    

    // Update Sales Units in Redux Store
    const onCellValueChanged = (params: any) => {
        const { id, salesUnits } = params.data;
        dispatch(updateSalesUnits({ id, salesUnits }));
        params.api.refreshCells({ force: true });
    };

    // Conditional Formatting for GM%
    const gmPercentCellStyle = (params: any) => {
        const value = parseFloat(params.value);
        if (isNaN(value)) return null;
        if (value >= 40) return { backgroundColor: 'green', color: 'white' };
        if (value >= 10) return { backgroundColor: 'yellow', color: 'black' };
        if (value >= 5) return { backgroundColor: 'orange', color: 'black' };
        return { backgroundColor: 'red', color: 'white' };
    };

    // Column Definitions for AG-Grid
    const columnDefs: ColDef<PlanningRow>[] = useMemo(() => [
        { 
            headerName: 'Store', 
            field: 'storeId', 
            valueFormatter: (params) => `Store ${params.value}` 
        },
        { 
            headerName: 'SKU', 
            field: 'skuId', 
            valueFormatter: (params) => `SKU ${params.value}` 
        },
        { 
            headerName: 'Sales Units', 
            field: 'salesUnits', 
            editable: true 
        },
        {
            headerName: 'Sales Dollars',
            valueGetter: (params: ValueGetterParams<PlanningRow, any>) => {
                const data = params.data as PlanningRow; 
                return (data.salesUnits * data.price).toFixed(2);
            }
        },
        {
            headerName: 'GM Dollars',
            valueGetter: (params: ValueGetterParams<PlanningRow, any>) => {
                const data = params.data as PlanningRow;
                return ((data.salesUnits * data.price) - (data.salesUnits * data.cost)).toFixed(2);
            }
        },
        {
            headerName: 'GM %',
            valueGetter: (params: ValueGetterParams<PlanningRow, any>) => {
                const data = params.data as PlanningRow;
                const salesDollars = data.salesUnits * data.price;
                const gmDollars = salesDollars - (data.salesUnits * data.cost);
                const gmPercent = salesDollars === 0 ? 0 : (gmDollars / salesDollars) * 100;
                return gmPercent.toFixed(2);
            },
            cellStyle: gmPercentCellStyle
        }
    ], []);

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
            <h1>Planning</h1>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={planningData}
                onCellValueChanged={onCellValueChanged}
                animateRows={true}
            />
        </div>
    );
};

export default Planning;
