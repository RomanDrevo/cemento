import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DynamicTable from './DynamicTable';
import '../mocks'
import {Column} from "../types";


const columns: Column[] = [
        {
            id: 'name',
            ordinalNo: 1,
            title: 'Name',
            type: 'string',
        },
        {
            id: 'age',
            ordinalNo: 2,
            title: 'Age',
            type: 'number',
        },
        {
            id: 'active',
            ordinalNo: 3,
            title: 'Active',
            type: 'boolean',
        },
        {
            id: 'gender',
            ordinalNo: 4,
            title: 'Gender',
            type: 'selection',
            options: ['Male', 'Female', 'Other'],
        },
    ];

const data = [
        {
            id: '1',
            name: 'John Doe',
            age: 30,
            active: true,
            gender: 'Male',
        },
        {
            id: '2',
            name: 'Jane Smith',
            age: 25,
            active: false,
            gender: 'Female',
        },
        {
            id: '3',
            name: 'Alex Johnson',
            age: 35,
            active: true,
            gender: 'Other',
        },
        // ... remaining data objects
    ];
describe('DynamicTable', () => {

    test('allows editing cell values', () => {
        render(<DynamicTable columns={columns} data={data} />);

        // Find an editable cell and change its value
        const ageCellInput = screen.getByDisplayValue('30');
        fireEvent.change(ageCellInput, { target: { value: '35' } });

        // Verify that the edited value is updated in the component state
        // @ts-ignore
        expect(ageCellInput.value).toBe('35');
    });

    test('allows saving edited data', () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

        render(<DynamicTable columns={columns} data={data} />);

        // Find the "Save Data" button and click it
        const saveDataButton = screen.getByText('Save Data');
        fireEvent.click(saveDataButton);

        // Verify that the edited data is logged to the console
        expect(mockConsoleLog).toHaveBeenCalledWith(data);

        // Restore the original console.log implementation
        mockConsoleLog.mockRestore();
    });

    test('allows searching data', () => {
        render(<DynamicTable columns={columns} data={data} />);

        // Find the search input field
        const searchInput = screen.getByPlaceholderText('Search...');
        expect(searchInput).toBeInTheDocument();

        // Search for "John" in the data
        fireEvent.change(searchInput, { target: { value: 'John' } });


        // Verify that the filtered data contains "John Doe"
        expect(screen.getByTestId('input_1')).toBeInTheDocument();
        expect(screen.queryByTestId('input_2')).toBeNull()

        //
        // Search for "Male" in the data
        fireEvent.change(searchInput, { target: { value: 'Female' } });
        //
        // Verify that the filtered data doesn't contains "John Doe" and "Alex Johnson"

        expect(screen.getByTestId('input_2')).toBeInTheDocument();
        expect(screen.queryByTestId('input_1')).toBeNull()
        expect(screen.queryByTestId('input_3')).toBeNull()

    });


});
