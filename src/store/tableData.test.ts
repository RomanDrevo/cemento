import tableDataReducer, {
    setEditedData,
    saveData,
    updateSearchQuery,
    setFilteredColumns,
    selectData,
    selectFilteredColumns,
    selectSearchQuery
} from './tableDataSlice';

describe('tableDataSlice', () => {
    const initialState = {
        data: [],
        filteredColumns: [],
        searchQuery: ''
    };

    it('should handle setEditedData', () => {
        const editedData = [{ id: '1', name: 'John Doe' }];
        const nextState = tableDataReducer(initialState, setEditedData(editedData));
        expect(nextState.data).toEqual(editedData);
    });

    it('should handle saveData', () => {
        const editedData = [{ id: '1', name: 'John Doe' }];
        const nextState = tableDataReducer(initialState, saveData(editedData));
        expect(nextState.data).toEqual(editedData);
        expect(localStorage.getItem('editedData')).toEqual(JSON.stringify(editedData));
    });

    it('should handle updateSearchQuery', () => {
        const searchQuery = 'John';
        const nextState = tableDataReducer(initialState, updateSearchQuery(searchQuery));
        expect(nextState.searchQuery).toEqual(searchQuery);
    });

    it('should handle setFilteredColumns', () => {
        const filteredColumns = ['name', 'age'];
        const nextState = tableDataReducer(initialState, setFilteredColumns(filteredColumns));
        expect(nextState.filteredColumns).toEqual(filteredColumns);
    });

    it('should select data', () => {
        const state = { table: { data: [{ id: '1', name: 'John Doe' }] } };
        const selectedData = selectData(state);
        expect(selectedData).toEqual([{ id: '1', name: 'John Doe' }]);
    });

    it('should select filteredColumns', () => {
        const state = { table: { filteredColumns: ['name', 'age'] } };
        const selectedFilteredColumns = selectFilteredColumns(state);
        expect(selectedFilteredColumns).toEqual(['name', 'age']);
    });

    it('should select searchQuery', () => {
        const state = { table: { searchQuery: 'John' } };
        const selectedSearchQuery = selectSearchQuery(state);
        expect(selectedSearchQuery).toEqual('John');
    });
});
