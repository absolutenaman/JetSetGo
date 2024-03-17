import React from "react";
import { render } from "@testing-library/react-native";
import Card from "./Card";

describe("<Card />", () => {
  const flight = {
    id: 1,
    gate: "A2",
    price: 5000,
    origin: "Delhi",
    airline: "IndiGo",
    aircraft: "Airbus A320",
    duration: "3 hours",
    arrivalTime: "2024-03-15T11:00:00",
    destination: "Mumbai",
    flightNumber: "6E101",
    departureTime: "2024-03-15T08:00:00",
    seatsAvailable: 120,
  };

  const navigation = {
    navigate: jest.fn(),
  };

  it("renders airline logo and flight details", () => {
    const { getByText, getByTestId } = render(
      <Card flight={flight} navigation={navigation} />
    );

 
    const airlineLogo = getByTestId("airline-logo");
    expect(airlineLogo).toBeTruthy();

  
    expect(getByText("IndiGo")).toBeTruthy();
    expect(getByText("Duration 3 hours")).toBeTruthy();
    expect(getByText("Departure Time 08:00")).toBeTruthy();
    expect(getByText("Seats Available 120")).toBeTruthy();
    expect(getByText("5000")).toBeTruthy();
  });


});
