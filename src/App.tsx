import React from 'react';
import './App.css';
import DynamicTable from "./components/DynamicTable";
import {dataset4} from "./mocks";

function App() {
  return (
    <div className="App">
      <DynamicTable {...dataset4} />
    </div>
  );
}

export default App;
