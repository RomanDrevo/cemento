import React, { useEffect, useState } from 'react';
import {Table, Input, Button, Select, Switch, Collapse} from 'antd';
import { Column, RowData, TableData } from "../types";
import { useDispatch, useSelector } from 'react-redux';
import {
    saveData,
    selectFilteredColumns,
    selectSearchQuery,
    setFilteredColumns,
    updateSearchQuery
} from '../store/tableDataSlice';
import FilterColumns from "./FilterColumns";
import SearchData from "./SearchData";
import {ColumnType} from "antd/lib/table";

const { Panel } = Collapse;


const DynamicTable: React.FC<TableData> = ({ columns, data }) => {
    const [editedData, setEditedData] = useState<RowData[]>(data);
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);


    const dispatch = useDispatch();

    const searchQuery = useSelector(selectSearchQuery)
    const filteredColumns = useSelector(selectFilteredColumns)

    useEffect(() => {
        // Load data from local storage when the component mounts
        const storedData = localStorage.getItem('editedData');
        if (storedData) {
            setEditedData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        // Save data to local storage whenever the editedData state changes
        localStorage.setItem('editedData', JSON.stringify(editedData));
    }, [editedData]);

    const handleCellChange = (rowId: string, columnId: string, value: any) => {
        // Update the editedData state when a cell value changes
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
        // Toggle the visibility of a column when its checkbox is clicked
        if (filteredColumns.includes(columnId)) {
            dispatch(setFilteredColumns(filteredColumns.filter((id: string) => id !== columnId)));
        } else {
            dispatch(setFilteredColumns([...filteredColumns, columnId]));
        }
    };

    const handleSearchQueryChange = (value: string) => {
        // Update the searchQuery state when the search input value changes
        dispatch(updateSearchQuery(value))
    };

    const filterData = (data: RowData[], query: string) => {
        // Filter the data based on the search query
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
        // Render different types of cells based on the column type
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

    const handleSaveData = () => {
        // Handle saving the edited data
        console.log(editedData);
        dispatch(saveData(editedData));
    };

    const filteredColumnsData = columns.filter((column) => !filteredColumns.includes(column.id));
    const filteredData = filterData(editedData, searchQuery);
    const dataSource = filteredData.map((row) => ({ key: row.id, ...row }));

    const groupRows = (rows: any[], columnId: string) => {
        const groups: any[] = [];
        let currentGroup: any[] = [];
        let prevValue: any = null;

        rows.forEach((row) => {
            const value = row[columnId];

            if (value !== prevValue) {
                if (currentGroup.length > 0) {
                    groups.push({ key: prevValue, rows: currentGroup });
                    currentGroup = [];
                }

                prevValue = value;
            }

            currentGroup.push(row);
        });

        if (currentGroup.length > 0) {
            groups.push({ key: prevValue, rows: currentGroup });
        }

        return groups;
    };
    console.log(columns);
    const groupedData = groupRows(dataSource, columns[1].id);
    console.log('--->>>groupedData: ', groupedData);


    const renderGroup = (group: any) => (
        <Panel
            header={group.key}
            key={group.key}
            showArrow={false}
            collapsible="header"
        >
            <Table
                dataSource={group.rows}
                pagination={false}
                showHeader={true} // Set showHeader to true
                size="middle"
            >
                {filteredColumnsData.map((column) => (
                    <Table.Column
                        title={column.title}
                        dataIndex={column.id}
                        key={column.id}
                        render={(text: any, record: RowData) =>
                            renderCell(column, text, record)
                        }
                    />
                ))}
            </Table>
        </Panel>
    );



    return (
        <div>
            {/* Save Data button */}
            <Button type="primary" onClick={handleSaveData}>
                Save Data
            </Button>

            {/* Filter Columns component */}
            <FilterColumns columns={columns} filteredColumns={filteredColumns} handleColumnToggle={handleColumnToggle} />

            {/* Search Data component */}
            <SearchData searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />

            <Collapse
                bordered={false}
                activeKey={expandedGroups}
                onChange={(keys) => setExpandedGroups(keys as string[])}
            >
                {groupedData.map((group) => renderGroup(group))}
            </Collapse>

        </div>
    );
};

export default DynamicTable;
