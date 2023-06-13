import React from 'react';
import './App.css';
import DynamicTable from "./components/DynamicTable";

export interface Column {
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

const columns: Column[] = [
  { id: 'id', ordinalNo: 1, title: 'ID', type: 'string', width: 100 },
  { id: 'name', ordinalNo: 2, title: 'Name', type: 'string', width: 200 },
  { id: 'age', ordinalNo: 3, title: 'Age', type: 'number', width: 100 },
  { id: 'active', ordinalNo: 4, title: 'Active', type: 'boolean', width: 100 },
  { id: 'gender', ordinalNo: 5, title: 'Gender', type: 'string', width: 100 },
];

const data: RowData[] = [
  {
    id: '1',
    name: 'John',
    age: 25,
    active: true,
    gender: 'Male',
  },
  {
    id: '2',
    name: 'Jane',
    age: 30,
    active: false,
    gender: 'Female',
  },
  {
    id: '3',
    name: 'Bob',
    age: 40,
    active: true,
    gender: 'Male',
  },
  {
    id: '4',
    name: 'Alice',
    age: 35,
    active: false,
    gender: 'Female',
  },
];

function App() {
  return (
    <div className="App">
      <DynamicTable columns={columns} data={data} />
    </div>
  );
}

export default App;
