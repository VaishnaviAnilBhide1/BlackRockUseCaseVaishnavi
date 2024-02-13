import React from 'react';
import './App.css';
import Navbar from './components/ColorSchemesExample';
import InputCards from './components/InputCards';
import 'bootstrap/dist/css/bootstrap.min.css';
import StripedRowExample from './components/Tableapi'
import { Provider } from 'react-redux';
import store from '../src/redux/store'

function App() {

  return (
    <Provider store={store}>
    <div className="App">
    <Navbar/>
    <InputCards/>
    <StripedRowExample />
    </div>
    </Provider>
  );
}

export default App;
