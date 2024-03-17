
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

describe('HomeScreen', () => {
it('should render correctly with initial state', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Search Flights')).toBeTruthy();
    expect(getByText('FROM')).toBeTruthy();
    expect(getByText('TO')).toBeTruthy();
  });
  it('should update state on input changes', () => {
    const { getByPlaceholderText, getByText } = render(<HomeScreen />);
  
    const fromInput = getByPlaceholderText('FROM');
    fireEvent.changeText(fromInput, 'Delhi');
    expect(fromInput.value).toBe('Delhi');
  
    const toInput = getByPlaceholderText('TO');
    fireEvent.changeText(toInput, 'Chennai');
    expect(toInput.value).toBe('Chennai');
  });
  it('should show and hide date picker on button press', () => {
    const { getByText, getByTestId } = render(<HomeScreen />);
  
    const datePickerButton = getByText('DEPARTURE');
    expect(getByTestId('modal')).toBeFalsy();
  
    fireEvent.press(datePickerButton);
    expect(getByTestId('modal')).toBeTruthy(); 
  
    fireEvent.press(getByText('Cancel')); 
    expect(getByTestId('modal')).toBeFalsy(); 
  });
  it('should filter flights based on origin and destination', () => {
    const mockApiResponse = [
      { origin: 'Delhi', destination: 'Mumbai' },
      { origin: 'Delhi', destination: 'Chennai' },
    ];
    jest.spyOn(HomeScreen, 'fetchData').mockReturnValue(Promise.resolve(mockApiResponse));
  
    const { getByText, getByPlaceholderText, fireEvent } = render(<HomeScreen />);
  
    const fromInput = getByPlaceholderText('FROM');
    fireEvent.changeText(fromInput, 'Delhi');
    const toInput = getByPlaceholderText('TO');
    fireEvent.changeText(toInput, 'Mumbai');
    fireEvent.press(getByText('Search Flights'));
  
    expect(getByTestId('flights')).toBeTruthy();
  });
});