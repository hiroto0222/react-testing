import { render, screen } from "@testing-library/react";
import { Greet } from "./Greet";

describe("Greet", () => {
  /**
   * Greet should render the text "Hello"
   */
  it("renders correctly", () => {
    render(<Greet />);
    const textEle = screen.getByText(/hello/i);
    expect(textEle).toBeInTheDocument();
  });

  /**
   * If a name is passed into the Greet component, it should render "Hello" followed by the passed name
   */
  it("renders with a name", () => {
    const name = "Hiroto";
    render(<Greet name={name} />);
    const textEle = screen.getByText("Hello " + name);
    expect(textEle).toBeInTheDocument();
  });
});
