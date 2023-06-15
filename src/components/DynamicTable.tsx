import React, {useEffect, useState} from 'react';
import {Table, Input, Button, Select, Switch, Collapse} from 'antd';
import {Column, RowData, TableData} from "../types";
import {useDispatch, useSelector} from 'react-redux';
import {
    saveData, selectData,
    selectFilteredColumns,
    selectSearchQuery, setEditedData,
    setFilteredColumns,
    updateSearchQuery
} from '../store/tableDataSlice';
import FilterColumns from "./FilterColumns";
import SearchData from "./SearchData";

const {Panel} = Collapse;


const DynamicTable: React.FC<TableData> = ({columns, data}) => {
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);


    const dispatch = useDispatch();

    const searchQuery = useSelector(selectSearchQuery)
    const filteredColumns = useSelector(selectFilteredColumns)
    const editedData = useSelector(selectData)

    useEffect(() => {
        // Load data from local storage when the component mounts
        const storedData = localStorage.getItem('editedData');

        if (storedData && JSON.parse(storedData).length > 0) {
            dispatch(setEditedData(JSON.parse(storedData)));
        } else {
            dispatch(setEditedData(data)); // Set the data from component props
        }
    }, []);


    const handleCellChange = (rowId: string, columnId: string, value: any) => {
        // Update the editedData state when a cell value changes
        const updatedData = editedData.map((row: RowData) => {
            if (row.id === rowId) {
                return {
                    ...row,
                    [columnId]: value,
                };
            }
            return row;
        });
        dispatch(setEditedData(updatedData));
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
        dispatch(saveData(editedData));
    };

    const filteredColumnsData = columns.filter((column) => !filteredColumns.includes(column.id));
    const filteredData = filterData(editedData, searchQuery);
    const dataSource = filteredData.map((row) => ({key: row.id, ...row}));

    const groupRows = (rows: any[], columnId: string) => {
        const groups: any[] = [];
        const groupMap: any = {};

        rows.forEach((row) => {
            const value = row[columnId];
            if (!groupMap[value]) {
                groupMap[value] = [];
                groups.push({ key: value, rows: groupMap[value] });
            }
            groupMap[value].push(row);
        });

        return groups;
    };


    const groupedData = groupRows(dataSource, "occupation");


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
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
                justifyContent: 'space-around',
                paddingTop: '20px',
                paddingBottom: '20px'
            }}>
                {/* Filter Columns component */}
                <FilterColumns columns={columns} filteredColumns={filteredColumns}
                               handleColumnToggle={handleColumnToggle}/>

                <Button type="primary" onClick={handleSaveData}>
                    Save Data
                </Button>


                {/* Search Data component */}
                <SearchData searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange}/>
            </div>


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
