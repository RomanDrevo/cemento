import React, { useState } from 'react';
import {RowData, TableData} from "../App";



const DynamicTable: React.FC<TableData> = ({ columns, data }) => {
    const [filteredColumns, setFilteredColumns] = useState<string[]>([]);

    const toggleColumn = (columnId: string) => {
        if (filteredColumns.includes(columnId)) {
            setFilteredColumns(filteredColumns.filter(id => id !== columnId));
        } else {
            setFilteredColumns([...filteredColumns, columnId]);
        }
    };

    const filteredData = data.map(row => {
        const filteredRow: RowData = { id: row.id };
        columns.forEach(column => {
            if (!filteredColumns.includes(column.id)) {
                filteredRow[column.id] = row[column.id];
            }
        });
        return filteredRow;
    });

    return (
        <div>
            <div>
                <h3>Filter Columns:</h3>
                {columns.map(column => (
                    <label key={column.id}>
                        <input
                            type="checkbox"
                            checked={!filteredColumns.includes(column.id)}
                            onChange={() => toggleColumn(column.id)}
                        />
                        {column.title}
                    </label>
                ))}
            </div>
            <table>
                <thead>
                <tr>
                    {columns
                        .filter(column => !filteredColumns.includes(column.id))
                        .map(column => (
                            <th key={column.id} style={{ width: column.width }}>
                                {column.title}
                            </th>
                        ))}
                </tr>
                </thead>
                <tbody>
                {filteredData.map(row => (
                    <tr key={row.id}>
                        {columns
                            .filter(column => !filteredColumns.includes(column.id))
                            .map(column => (
                                <td key={`${row.id}-${column.id}`}>
                                    {row[column.id]}
                                </td>
                            ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable

