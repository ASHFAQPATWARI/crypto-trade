import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders home link", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const homeLink = screen.getByText(/home/i);
  expect(homeLink).toBeInTheDocument();
});

test("renders trade link", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const tradeLink = screen.getByText(/trade/i);
  expect(tradeLink).toBeInTheDocument();
});
