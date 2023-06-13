import React from 'react';
import './App.css';
import DynamicTable from "./components/DynamicTable";

export interface ColumnDefinition {
  id: string;
  ordinalNo: number;
  title: string;
  type: string;
  width?: number;
}

export interface RowData {
  id: string;
  [columnId: string]: any;
}

export interface TableData {
  columns: ColumnDefinition[];
  data: RowData[];
}

// Usage example
const tableData: TableData = {
  columns: [
    {
      id: 'column1',
      ordinalNo: 1,
      title: 'Column 1',
      type: 'string',
      width: 100
    },
    {
      id: 'column2',
      ordinalNo: 2,
      title: 'Column 2',
      type: 'number',
      width: 150
    },
    {
      id: 'column3',
      ordinalNo: 3,
      title: 'Column 3',
      type: 'boolean',
      width: 100
    }
  ],
  data: [
    {
      id: 'row1',
      column1: 'Value 1',
      column2: 123,
      column3: true
    },
    {
      id: 'row2',
      column1: 'Value 2',
      column2: 456,
      column3: false
    },
    {
      id: 'row3',
      column1: 'Value 3',
      column2: 789,
      column3: true
    }
  ]
};

function App() {
  return (
    <div className="App">
      <DynamicTable {...tableData} />
    </div>
  );
}

export default App;
