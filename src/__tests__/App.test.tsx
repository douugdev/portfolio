import React from "react";
import { render, screen } from "@testing-library/react";
import StellarSystem from "../components/StellarSystem";

test("renders landing page", () => {
  render(<StellarSystem />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
