import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RowData } from '../types';

interface TableDataState {
    data: RowData[];
}

const initialState: TableDataState = {
    data: [],
};

const tableDataSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        saveData: (state, action: PayloadAction<RowData[]>) => {
            state.data = action.payload;
        },
    },
});

export const { saveData } = tableDataSlice.actions;

export default tableDataSlice.reducer;