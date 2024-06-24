import { render, screen } from "@testing-library/react";
import { Greet } from "./Greet";

test("Greet renders correctly", () => {
  render(<Greet />); // virtual dom from RTL
  const textElement = screen.getByText(/hello/i); // grab element from virtual DOM
  expect(textElement).toBeInTheDocument(); // expected assertions using Jest
});
