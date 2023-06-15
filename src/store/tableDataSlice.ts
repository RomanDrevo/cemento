import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RowData } from '../types';


interface TableDataState {
    data: RowData[];
    // editedData: RowData[];
    filteredColumns: string[];
    searchQuery: string;
}

const initialState: TableDataState = {
    data: [],
    // editedData: [],
    filteredColumns: [],
    searchQuery: '',
};

const tableDataSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        saveData: (state, action: PayloadAction<RowData[]>) => {
            state.data = action.payload;
            localStorage.setItem('editedData', JSON.stringify(action.payload));
        },
        updateSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setFilteredColumns: (state, action: PayloadAction<string[]>) => {
            state.filteredColumns = action.payload;
        },
        setEditedData: (state, action: PayloadAction<RowData[]>) => {
            state.data = action.payload;
        },
    },
});

export const {setEditedData, saveData, updateSearchQuery, setFilteredColumns } = tableDataSlice.actions;

export const selectData = (state: any) => state.table.data;
export const selectFilteredColumns = (state: any) => state.table.filteredColumns;
export const selectSearchQuery = (state: any) => state.table.searchQuery;
export default tableDataSlice.reducer;