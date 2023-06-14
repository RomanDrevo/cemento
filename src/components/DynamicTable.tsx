import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Switch } from 'antd';
import { Column, RowData, TableData } from "../types";
import { useDispatch } from 'react-redux';
import { saveData } from '../store/tableDataSlice';

const DynamicTable: React.FC<TableData> = ({ columns, data }) => {
    const [editedData, setEditedData] = useState<RowData[]>(data);
    const [filteredColumns, setFilteredColumns] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const storedData = localStorage.getItem('editedData');
        if (storedData) {
            setEditedData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('editedData', JSON.stringify(editedData));
    }, [editedData]);

    const handleCellChange = (rowId: string, columnId: string, value: any) => {
        const updatedData = editedData.map((row) => {
            if (row.id === rowId) {
                return {
                    ...row,
                    [columnId]: value,
                };
            }
            return row;
        });
        setEditedData(updatedData);
    };

    const handleColumnToggle = (columnId: string) => {
        if (filteredColumns.includes(columnId)) {
            setFilteredColumns(filteredColumns.filter((id) => id !== columnId));
        } else {
            setFilteredColumns([...filteredColumns, columnId]);
        }
    };

    const handleSearchQueryChange = (value: string) => {
        setSearchQuery(value);
    };

    const filterData = (data: RowData[], query: string) => {
        if (query.trim() === '') {
            return data;
        }

        const lowerCaseQuery = query.toLowerCase();
        return data.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(lowerCaseQuery)
            )
        );
    };

    const renderCell = (column: Column, text: any, record: RowData) => {
        switch (column.type) {
            case 'string':
                return (
                    <div className="dynamic-table-cell">
                        <Input
                            value={text}
                            onChange={(e) => handleCellChange(record.id, column.id, e.target.value)}
                            data-testid={`input_${record.id}`}
                        />
                    </div>
                );
            case 'number':
                return (
                    <div className="dynamic-table-cell">
                        <Input
                            type="number"
                            value={text}
                            onChange={(e) => handleCellChange(record.id, column.id, parseFloat(e.target.value))}
                        />
                    </div>
                );
            case 'boolean':
                return (
                    <div className="dynamic-table-cell">
                        <Switch
                            checked={text}
                            onChange={(checked) => handleCellChange(record.id, column.id, checked)}
                        />
                    </div>
                );
            case 'selection':
                return (
                    <div className="dynamic-table-cell">
                        <Select
                            value={text}
                            onChange={(value) => handleCellChange(record.id, column.id, value)}
                        >
                            {column.options?.map((option) => (
                                <Select.Option key={option} value={option}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                );
            default:
                return <div className="dynamic-table-cell">{text}</div>;
        }
    };
    const dispatch = useDispatch();
    const handleSaveData = () => {
        // Handle saving the edited data here
        console.log(editedData);
        dispatch(saveData(editedData));
    };

    const filteredColumnsData = columns.filter((column) => !filteredColumns.includes(column.id));
    const filteredData = filterData(editedData, searchQuery);

    return (
        <div>
            <Button type="primary" onClick={handleSaveData}>
                Save Data
            </Button>
            <div>
                <h3>Filter Columns:</h3>
                {columns.map((column) => (
                    <label key={column.id}>
                        <input
                            type="checkbox"
                            checked={!filteredColumns.includes(column.id)}
                            onChange={() => handleColumnToggle(column.id)}
                            data-testid={`column-checkbox_${column.id}`}
                        />
                        {column.title}
                    </label>
                ))}
            </div>
            <div>
                <h3>Search Data:</h3>
                <Input.Search
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => handleSearchQueryChange(e.target.value)}
                />
            </div>
            <Table
                dataSource={filteredData}
                columns={filteredColumnsData.map((column) => ({
                    title: column.title,
                    dataIndex: column.id,
                    key: column.id,
                    render: (text: any, record: RowData) => renderCell(column, text, record),
                }))}
                pagination={false}
                rowKey="id"
            />
        </div>
    );
};

export default DynamicTable;
