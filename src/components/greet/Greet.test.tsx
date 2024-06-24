import { render, screen } from "@testing-library/react";
import { Greet } from "./Greet";

/**
 * Greet should render the text "Hello"
 */
test("Greet renders correctly", () => {
  render(<Greet />);
  const textEle = screen.getByText("Hello");
  expect(textEle).toBeInTheDocument();
});

/**
 * If a name is passed into the Greet component, it should render "Hello" followed by the passed name
 */
test("Greet renders with a name", () => {
  const name = "Hiroto";
  render(<Greet name={name} />);
  const textEle = screen.getByText("Hello " + name);
  expect(textEle).toBeInTheDocument();
});
