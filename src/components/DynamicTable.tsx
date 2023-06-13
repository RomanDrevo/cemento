import React, {useEffect, useState} from 'react';
import {Column, RowData} from "../App";
import { Table, Input, Button, Select, Switch } from 'antd';




interface TableData {
    columns: Column[];
    data: RowData[];
}

const DynamicTable: React.FC<TableData> = ({ columns, data }) => {
    const [editedData, setEditedData] = useState<RowData[]>(data);
    const [filteredColumns, setFilteredColumns] = useState<string[]>([]);

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

    const renderCell = (column: Column, text: any, record: RowData) => {
        switch (column.type) {
            case 'string':
                return (
                    <Input
                        value={text}
                        onChange={(e) => handleCellChange(record.id, column.id, e.target.value)}
                    />
                );
            case 'number':
                return (
                    <Input
                        type="number"
                        value={text}
                        onChange={(e) => handleCellChange(record.id, column.id, parseFloat(e.target.value))}
                    />
                );
            case 'boolean':
                return (
                    <Switch
                        checked={text}
                        onChange={(checked) => handleCellChange(record.id, column.id, checked)}
                    />
                );
            case 'selection':
                return (
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
                );
            default:
                return text;
        }
    };

    const handleSaveData = () => {
        // Handle saving the edited data here
        console.log(editedData);
    };

    const filteredColumnsData = columns.filter((column) => !filteredColumns.includes(column.id));

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
                        />
                        {column.title}
                    </label>
                ))}
            </div>
            <Table
                dataSource={editedData}
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

// const DynamicTable: React.FC<TableData> = ({ columns, data }) => {
//     const [editedData, setEditedData] = useState<RowData[]>(data);
//     const [filteredColumns, setFilteredColumns] = useState<string[]>([]);
//
//     const handleCellChange = (rowId: string, columnId: string, value: any) => {
//         const updatedData = editedData.map((row) => {
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
//     const handleColumnToggle = (columnId: string) => {
//         if (filteredColumns.includes(columnId)) {
//             setFilteredColumns(filteredColumns.filter((id) => id !== columnId));
//         } else {
//             setFilteredColumns([...filteredColumns, columnId]);
//         }
//     };
//
//     const renderCell = (column: Column, text: any, record: RowData) => {
//         switch (column.type) {
//             case 'string':
//                 return (
//                     <Input
//                         value={text}
//                         onChange={(e) => handleCellChange(record.id, column.id, e.target.value)}
//                     />
//                 );
//             case 'number':
//                 return (
//                     <Input
//                         type="number"
//                         value={text}
//                         onChange={(e) => handleCellChange(record.id, column.id, parseFloat(e.target.value))}
//                     />
//                 );
//             case 'boolean':
//                 return (
//                     <Switch
//                         checked={text}
//                         onChange={(checked) => handleCellChange(record.id, column.id, checked)}
//                     />
//                 );
//             case 'selection':
//                 return (
//                     <Select
//                         value={text}
//                         onChange={(value) => handleCellChange(record.id, column.id, value)}
//                     >
//                         {column.options?.map((option) => (
//                             <Select.Option key={option} value={option}>
//                                 {option}
//                             </Select.Option>
//                         ))}
//                     </Select>
//                 );
//             default:
//                 return text;
//         }
//     };
//
//     const handleSaveData = () => {
//         // Handle saving the edited data here
//         console.log(editedData);
//     };
//
//     const filteredColumnsData = columns.filter((column) => !filteredColumns.includes(column.id));
//
//     return (
//         <div>
//             <Button type="primary" onClick={handleSaveData}>
//                 Save Data
//             </Button>
//             <div>
//                 <h3>Filter Columns:</h3>
//                 {columns.map((column) => (
//                     <label key={column.id}>
//                         <input
//                             type="checkbox"
//                             checked={!filteredColumns.includes(column.id)}
//                             onChange={() => handleColumnToggle(column.id)}
//                         />
//                         {column.title}
//                     </label>
//                 ))}
//             </div>
//             <Table
//                 dataSource={editedData}
//                 columns={filteredColumnsData.map((column) => ({
//                     title: column.title,
//                     dataIndex: column.id,
//                     key: column.id,
//                     render: (text: any, record: RowData) => renderCell(column, text, record),
//                 }))}
//                 pagination={false}
//                 rowKey="id"
//             />
//         </div>
//     );
// };

export default DynamicTable

