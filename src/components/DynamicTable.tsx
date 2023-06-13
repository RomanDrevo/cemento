import React, { useState, useEffect } from 'react';
import {Column, RowData} from "../App";
import { Table, Input, Button, Checkbox } from 'antd';




interface TableData {
    columns: Column[];
    data: RowData[];
}

const DynamicTable: React.FC<TableData> = ({ columns, data }) => {
    const [editedData, setEditedData] = useState<RowData[]>(data);

    const handleCellChange = (rowId: string, columnId: string, value: any) => {
        const updatedData = editedData.map(row => {
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

    const handleSaveData = () => {
        // Handle saving the edited data here
        console.log(editedData);
    };

    const renderTable = () => (
        <Table
            dataSource={editedData}
            columns={columns.map(column => ({
                title: column.title,
                dataIndex: column.id,
                key: column.id,
                render: (text: any, record: RowData) => (
                    <Input
                        value={text}
                        onChange={e => handleCellChange(record.id, column.id, e.target.value)}
                    />
                ),
            }))}
            pagination={false}
            rowKey="id"
        />
    );

    return (
        <div>
            <Button type="primary" onClick={handleSaveData}>
                Save Data
            </Button>
            {renderTable()}
        </div>
    );
};


export default DynamicTable

