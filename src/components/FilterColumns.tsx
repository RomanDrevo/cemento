import React from "react";
import {Column} from "../types";

const FilterColumns: React.FC<{ columns: Column[], filteredColumns: string[], handleColumnToggle: (columnId: string) => void }> = ({ columns, filteredColumns, handleColumnToggle }) => {
    return (
        <div style={{marginRight: '50px', marginLeft: '50px'}}>
            <h3>Hide Columns:</h3>
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