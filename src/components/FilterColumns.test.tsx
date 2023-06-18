import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterColumns from './FilterColumns';

describe('FilterColumns', () => {
    const columns: any = [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'age', title: 'Age' },
    ];

    const filteredColumns = ['name', 'age'];
    const handleColumnToggle = jest.fn();

    it('renders the FilterColumns component', () => {
        const { getByText } = render(
            <FilterColumns
                columns={columns}
                filteredColumns={filteredColumns}
                handleColumnToggle={handleColumnToggle}
            />
        );

        expect(getByText('Hide Columns:')).toBeInTheDocument();
        expect(getByText('ID')).toBeInTheDocument();
        expect(getByText('Name')).toBeInTheDocument();
        expect(getByText('Age')).toBeInTheDocument();
    });

    it('calls handleColumnToggle when checkbox is toggled', () => {
        const { getByTestId } = render(
            <FilterColumns
                columns={columns}
                filteredColumns={filteredColumns}
                handleColumnToggle={handleColumnToggle}
            />
        );

        const nameCheckbox = getByTestId('column-checkbox_name');
        fireEvent.click(nameCheckbox);
        expect(handleColumnToggle).toHaveBeenCalledWith('name');
    });
});
