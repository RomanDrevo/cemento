import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RowData } from '../types';
import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";


interface TableDataState {
    data: RowData[];
    editedData: RowData[];
    filteredColumns: string[];
    searchQuery: string;
}

const initialState: TableDataState = {
    data: [],
    editedData: [],
    filteredColumns: [],
    searchQuery: '',
};

const tableDataSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        saveData: (state, action: PayloadAction<RowData[]>) => {
            state.data = action.payload;
        },
        updateSearchQuery: (state, action: PayloadAction<string>) => {
            console.log('--->>>payload: ',action )
            state.searchQuery = action.payload;
        },
    },
});

export const { saveData, updateSearchQuery } = tableDataSlice.actions;

export const selectEditedData = (state: any) => state.table.editedData;
export const selectFilteredColumns = (state: any) => state.table.filteredColumns;
export const selectSearchQuery = (state: any) => state.table.searchQuery;
export default tableDataSlice.reducer;