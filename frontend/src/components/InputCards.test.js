import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputCards from './InputCards';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('InputCards component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      variables: {
        x: '',
        y: '',
        z: '',
        sig: '',
        rho: '',
        beta: '',
        delta: ''
      }
    });
  });


  test('dispatches action when input values change', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <InputCards />
      </Provider>
    );

    // Simulate input value changes
    fireEvent.change(getByPlaceholderText('Enter x0'), { target: { value: '10' } });
    fireEvent.change(getByPlaceholderText('Enter y0'), { target: { value: '20' } });
    fireEvent.change(getByPlaceholderText('Enter z0'), { target: { value: '30' } });
    fireEvent.change(getByPlaceholderText('Enter Sigma'), { target: { value: '0.1' } });
    fireEvent.change(getByPlaceholderText('Enter Rho'), { target: { value: '0.2' } });
    fireEvent.change(getByPlaceholderText('Enter Beta'), { target: { value: '0.3' } });
    fireEvent.change(getByPlaceholderText('Enter Delta t'), { target: { value: '0.4' } });

    // Check if corresponding actions are dispatched with correct payload
    expect(store.getActions()).toEqual([
      { type: 'SET_VARIABLE', payload: { name: 'x', value: '10' } },
      { type: 'SET_VARIABLE', payload: { name: 'y', value: '20' } },
      { type: 'SET_VARIABLE', payload: { name: 'z', value: '30' } },
      { type: 'SET_VARIABLE', payload: { name: 'sig', value: '0.1' } },
      { type: 'SET_VARIABLE', payload: { name: 'rho', value: '0.2' } },
      { type: 'SET_VARIABLE', payload: { name: 'beta', value: '0.3' } },
      { type: 'SET_VARIABLE', payload: { name: 'delta', value: '0.4' } }
    ]);
  });
});
