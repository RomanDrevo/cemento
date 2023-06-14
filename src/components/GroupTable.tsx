import React, {useState} from 'react';
import { Table, Collapse } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { TableData } from '../types';

const { Panel } = Collapse;

const columns = [
    {
        id: 'category',
        ordinalNo: 1,
        title: 'Category',
        type: 'string',
        width: 150,
    },
    {
        id: 'name',
        ordinalNo: 2,
        title: 'Name',
        type: 'string',
        width: 200,
    },
    {
        id: 'price',
        ordinalNo: 3,
        title: 'Price',
        type: 'number',
        width: 100,
    },
];

const data = [
    {
        id: '1',
        category: 'Fruit',
        name: 'Apple',
        price: 1.99,
    },
    {
        id: '2',
        category: 'Fruit',
        name: 'Banana',
        price: 0.99,
    },
    {
        id: '3',
        category: 'Vegetable',
        name: 'Carrot',
        price: 0.5,
    },
    {
        id: '4',
        category: 'Vegetable',
        name: 'Broccoli',
        price: 1.5,
    },
];
const GroupTable: React.FC = () => {
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

    const dataSource = data.map((row) => ({ key: row.id, ...row }));
    console.log(dataSource);
    const renderCell = (value: any, record: any, index: number) => ({
        children: value,
        props: {
            colSpan: 1,
            rowSpan: record.rowSpan || 1,
        },
    });


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

    const groupedData = groupRows(dataSource, columns[0].id);

    const tableColumns: ColumnType<any>[] = columns.map((column) => ({
        title: column.title,
        dataIndex: column.id,
        key: column.id,
        render: (value: any, record: any, index: number) =>
            renderCell(value, record, index),
    }));

    const renderGroup = (group: any) => (
        <Panel
            header={group.key}
            key={group.key}
            showArrow={false}
            collapsible="header"
        >
            <Table
                dataSource={group.rows}
                columns={tableColumns}
                pagination={false}
                showHeader={false}
                size="middle"
            />
        </Panel>
    );

    return (
        <Collapse
            bordered={false}
            activeKey={expandedGroups}
            onChange={(keys) => setExpandedGroups(keys as string[])}
        >
            {groupedData.map((group) => renderGroup(group))}
        </Collapse>
    );
};

export default GroupTable;