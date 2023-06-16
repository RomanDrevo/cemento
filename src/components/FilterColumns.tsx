import React from "react";
import {Column} from "../types";

const FilterColumns: React.FC<{ columns: Column[], filteredColumns: string[], handleColumnToggle: (columnId: string) => void }> = ({ columns, filteredColumns, handleColumnToggle }) => {
    return (
        <div>
            <h3>Filter Columns:</h3>
            {columns.map((column) => (
                <label key={column.id}>
                    <input
                        type="checkbox"
                        checked={filteredColumns.includes(column.id)}
                        onChange={() => handleColumnToggle(column.id)}
                        data-testid={`column-checkbox_${column.id}`}
                    />
                    {column.title}
                </label>
            ))}
        </div>
    );
};

export default FilterColumns;