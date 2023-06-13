import React, { useState, useEffect } from 'react';
import {RowData, TableData} from "../App";



const DynamicTable: React.FC<TableData> = ({ columns, data }) => {
    const [filteredColumns, setFilteredColumns] = useState<string[]>([]);
    const [editableCell, setEditableCell] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<RowData[]>(data);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [groupedRows, setGroupedRows] = useState<string[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem('tableData');
        if (storedData) {
            setEditedData(JSON.parse(storedData));
        } else {
            setEditedData(data);
        }
    }, [data]);

    useEffect(() => {
        localStorage.setItem('tableData', JSON.stringify(editedData));
    }, [editedData]);

    const toggleColumn = (columnId: string) => {
        if (filteredColumns.includes(columnId)) {
            setFilteredColumns(filteredColumns.filter(id => id !== columnId));
        } else {
            setFilteredColumns([...filteredColumns, columnId]);
        }
    };

    const handleCellClick = (rowId: string, columnId: string) => {
        setEditableCell(`${rowId}-${columnId}`);
    };

    const handleCellChange = (rowId: string, columnId: string, value: any) => {
        const updatedData = editedData.map(row => {
            if (row.id === rowId) {
                return {
                    ...row,
                    [columnId]: value
                };
            }
            return row;
        });
        setEditedData(updatedData);
    };

    const handleSaveData = () => {
        // Handle saving the edited data here
        console.log(editedData);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleGroupToggle = (rowId: string) => {
        if (groupedRows.includes(rowId)) {
            setGroupedRows(groupedRows.filter(id => id !== rowId));
        } else {
            setGroupedRows([...groupedRows, rowId]);
        }
    };

    const filterData = () => {
        let filteredData = editedData;

        if (searchTerm) {
            const searchColumns = columns
                .filter(column => !filteredColumns.includes(column.id))
                .map(column => column.id);

            filteredData = filteredData.filter(row =>
                searchColumns.some(column =>
                    String(row[column]).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (groupedRows.length > 0) {
            filteredData = filteredData.filter(row => !groupedRows.includes(row.id));
        }

        return filteredData;
    };

    const renderGroupedRows = () => {
        const groupedData: { [key: string]: RowData[] } = {};

        editedData.forEach(row => {
            const mainColumnValue = row[columns[0].id];
            if (groupedData.hasOwnProperty(mainColumnValue)) {
                groupedData[mainColumnValue].push(row);
            } else {
                groupedData[mainColumnValue] = [row];
            }
        });

        return Object.entries(groupedData).map(([key, rows]) => (
            <React.Fragment key={key}>
                <tr onClick={() => handleGroupToggle(key)}>
                    <td colSpan={columns.length}>{key}</td>
                </tr>
                {!groupedRows.includes(key) &&
                    rows.map(row => (
                        <tr key={row.id}>
                            {columns
                                .filter(column => !filteredColumns.includes(column.id))
                                .map(column => (
                                    <td
                                        key={`${row.id}-${column.id}`}
                                        onClick={() => handleCellClick(row.id, column.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {editableCell === `${row.id}-${column.id}` ? (
                                            <input
                                                type={column.type === 'boolean' ? 'checkbox' : 'text'}
                                                value={row[column.id]}
                                                onChange={e =>
                                                    handleCellChange(row.id, column.id, e.target.value)
                                                }
                                            />
                                        ) : (
                                            row[column.id]
                                        )}
                                    </td>
                                ))}
                        </tr>
                    ))}
            </React.Fragment>
        ));
    };

    const filteredData = filterData();

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
            <div>
                <h3>Search:</h3>
                <input type="text" value={searchTerm} onChange={handleSearch} />
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
                {groupedRows.length > 0 ? (
                    renderGroupedRows()
                ) : (
                    filteredData.map(row => (
                        <tr key={row.id}>
                            {columns
                                .filter(column => !filteredColumns.includes(column.id))
                                .map(column => (
                                    <td
                                        key={`${row.id}-${column.id}`}
                                        onClick={() => handleCellClick(row.id, column.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {editableCell === `${row.id}-${column.id}` ? (
                                            <input
                                                type={column.type === 'boolean' ? 'checkbox' : 'text'}
                                                value={row[column.id]}
                                                onChange={e =>
                                                    handleCellChange(row.id, column.id, e.target.value)
                                                }
                                            />
                                        ) : (
                                            row[column.id]
                                        )}
                                    </td>
                                ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            <button onClick={handleSaveData}>Save Data</button>
        </div>
    );
};

export default DynamicTable

