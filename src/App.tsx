import React from 'react';
import './App.css';
import DynamicTable from "./components/DynamicTable";
import {dataset4} from "./mocks";
import { Provider } from 'react-redux';
import tableDataReducer from './store/tableDataSlice';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from "redux-persist/integration/react";
import GroupTable from "./components/GroupTable";


const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, tableDataReducer);


const store = configureStore({
    reducer: {
        table: persistedReducer,
    },
});


const persistor = persistStore(store);


function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div className="App">
                <DynamicTable {...dataset4} />
                {/*<GroupTable  />*/}
            </div>
          </PersistGate>
      </Provider>
  );
}

export default App;
