import React from 'react';
import './App.css';
import DynamicTable from "./components/DynamicTable";

export interface Column {
  id: string; // ID of the column. Should match the one on the data rows
  ordinalNo: number; // Position of the column
  title: string; // Name of the column
  type: "string" | "number" | "boolean" | "selection"; // Type of the data in the column
  width?: number; // Defines the width of the column
  options?: string[]; // Options for selection type column
}

export interface RowData {
  id: string;
  [columnId: string]: any;
}

const columns: Column[] = [
  {
    id: "name",
    ordinalNo: 1,
    title: "Name",
    type: "string",
  },
  {
    id: "age",
    ordinalNo: 2,
    title: "Age",
    type: "number",
  },
  {
    id: "active",
    ordinalNo: 3,
    title: "Active",
    type: "boolean",
  },
  {
    id: "gender",
    ordinalNo: 4,
    title: "Gender",
    type: "selection",
    options: ["Male", "Female", "Other"],
  },
];

const data: RowData[] = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    active: true,
    gender: "Male",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 25,
    active: false,
    gender: "Female",
  },
  {
    id: "3",
    name: "Alex Johnson",
    age: 35,
    active: true,
    gender: "Other",
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
