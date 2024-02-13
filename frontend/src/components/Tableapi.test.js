import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StripedRowExample from '../components/Tableapi';
import '@testing-library/jest-dom/extend-expect';

// Mock Redux store
const mockStore = configureStore([]);

describe('StripedRowExample component', () => {
  let store;
  beforeEach(() => {
    // Mock Redux store state
    const initialState = {
      variables: {
        data: {
          // Mock data for testing
          1: [0, 1, 2],
          2: [3, 4, 5],
          // Add more mock data as needed
        },
      },
    };
    store = mockStore(initialState);
  });

  test('renders table header correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <StripedRowExample />
      </Provider>
    );
    expect(getByText('N')).toBeInTheDocument();
    expect(getByText('x')).toBeInTheDocument();
    expect(getByText('y')).toBeInTheDocument();
    expect(getByText('z')).toBeInTheDocument();
  });

  // Add more test cases as needed to cover different scenarios
});
