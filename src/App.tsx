import React from 'react';
import './App.css';
import DynamicTable from "./components/DynamicTable";
import {Column, RowData} from "./types";
import {dataset4} from "./mocks";

//
// const columns: Column[] = [
//   {
//     id: "name",
//     ordinalNo: 1,
//     title: "Name",
//     type: "string",
//   },
//   {
//     id: "age",
//     ordinalNo: 2,
//     title: "Age",
//     type: "number",
//   },
//   {
//     id: "active",
//     ordinalNo: 3,
//     title: "Active",
//     type: "boolean",
//   },
//   {
//     id: "gender",
//     ordinalNo: 4,
//     title: "Gender",
//     type: "selection",
//     options: ["Male", "Female", "Other"],
//   },
// ];
//
// const data: RowData[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     age: 30,
//     active: true,
//     gender: "Male",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     age: 25,
//     active: false,
//     gender: "Female",
//   },
//   {
//     id: "3",
//     name: "Alex Johnson",
//     age: 35,
//     active: true,
//     gender: "Other",
//   },
//   {
//     id: "4",
//     name: "Michael Brown",
//     age: 42,
//     active: true,
//     gender: "Male",
//   },
//   {
//     id: "5",
//     name: "Emily Davis",
//     age: 28,
//     active: false,
//     gender: "Female",
//   },
//   {
//     id: "6",
//     name: "Daniel Wilson",
//     age: 39,
//     active: true,
//     gender: "Male",
//   },
//   {
//     id: "7",
//     name: "Olivia Johnson",
//     age: 33,
//     active: true,
//     gender: "Female",
//   },
//   {
//     id: "8",
//     name: "William Anderson",
//     age: 29,
//     active: false,
//     gender: "Male",
//   },
//   {
//     id: "9",
//     name: "Sophia Martin",
//     age: 27,
//     active: true,
//     gender: "Female",
//   },
//   {
//     id: "10",
//     name: "James Thompson",
//     age: 37,
//     active: false,
//     gender: "Male",
//   },
//   {
//     id: "11",
//     name: "Mia White",
//     age: 24,
//     active: true,
//     gender: "Female",
//   },
//   {
//     id: "12",
//     name: "Alexander Harris",
//     age: 31,
//     active: true,
//     gender: "Male",
//   },
//   {
//     id: "13",
//     name: "Charlotte Clark",
//     age: 36,
//     active: false,
//     gender: "Female",
//   },
//   {
//     id: "14",
//     name: "Benjamin Martinez",
//     age: 26,
//     active: true,
//     gender: "Male",
//   },
//   {
//     id: "15",
//     name: "Ava Lewis",
//     age: 32,
//     active: true,
//     gender: "Female",
//   },
//   {
//     id: "16",
//     name: "Henry Taylor",
//     age: 40,
//     active: false,
//     gender: "Male",
//   },
//   {
//     id: "17",
//     name: "Sofia Walker",
//     age: 23,
//     active: true,
//     gender: "Female",
//   },
//   {
//     id: "18",
//     name: "Joseph Anderson",
//     age: 38,
//     active: true,
//     gender: "Male",
//   },
//   {
//     id: "19",
//     name: "Scarlett Wilson",
//     age: 34,
//     active: false,
//     gender: "Female",
//   },
//   {
//     id: "20",
//     name: "David Thompson",
//     age: 41,
//     active: true,
//     gender: "Other",
//   },
// ];


function App() {
  return (
    <div className="App">
      <DynamicTable {...dataset4} />
    </div>
  );
}

export default App;
