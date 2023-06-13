import React, { useState, useEffect } from 'react';
import {Column, RowData} from "../App";
import { Table, Input, Button, Checkbox, Select, Switch } from 'antd';




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

    const renderCell = (column: Column, text: any, record: RowData) => {
        switch (column.type) {
            case 'string':
                return (
                    <Input
                        value={text}
                        onChange={e => handleCellChange(record.id, column.id, e.target.value)}
                    />
                );
            case 'number':
                return (
                    <Input
                        type="number"
                        value={text}
                        onChange={e => handleCellChange(record.id, column.id, parseFloat(e.target.value))}
                    />
                );
            case 'boolean':
                return (
                    <Switch
                        checked={text}
                        onChange={checked => handleCellChange(record.id, column.id, checked)}
                    />
                );
            case 'selection':
                return (
                    <Select
                        value={text}
                        onChange={value => handleCellChange(record.id, column.id, value)}
                    >
                        {column.options?.map(option => (
                            <Select.Option key={option} value={option}>
                                {option}
                            </Select.Option>
                        ))}
                    </Select>
                );
            default:
                return text;
        }
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
                render: (text: any, record: RowData) => renderCell(column, text, record),
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

// const DynamicTable: React.FC<TableData> = ({ columns, data }) => {
//     const [editedData, setEditedData] = useState<RowData[]>(data);
//
//     const handleCellChange = (rowId: string, columnId: string, value: any) => {
//         const updatedData = editedData.map(row => {
//             if (row.id === rowId) {
//                 return {
//                     ...row,
//                     [columnId]: value,
//                 };
//             }
//             return row;
//         });
//         setEditedData(updatedData);
//     };
//
//     const handleSaveData = () => {
//         // Handle saving the edited data here
//         console.log(editedData);
//     };
//
//     const renderTable = () => (
//         <Table
//             dataSource={editedData}
//             columns={columns.map(column => ({
//                 title: column.title,
//                 dataIndex: column.id,
//                 key: column.id,
//                 render: (text: any, record: RowData) => (
//                     <Input
//                         value={text}
//                         onChange={e => handleCellChange(record.id, column.id, e.target.value)}
//                     />
//                 ),
//             }))}
//             pagination={false}
//             rowKey="id"
//         />
//     );
//
//     return (
//         <div>
//             <Button type="primary" onClick={handleSaveData}>
//                 Save Data
//             </Button>
//             {renderTable()}
//         </div>
//     );
// };


export default DynamicTable

