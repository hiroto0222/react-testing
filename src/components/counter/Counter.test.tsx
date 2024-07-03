import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("renders correctly", () => {
    render(<Counter />);
    const countEle = screen.getByRole("heading");
    expect(countEle).toBeInTheDocument();
    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });
    expect(incrementButton).toBeInTheDocument();
  });

  it("renders a count of 0 by default", () => {
    render(<Counter />);
    const countEle = screen.getByRole("heading");
    expect(countEle).toHaveTextContent("0");
  });

  it("renders a count of 1 after clicking the increment button once", async () => {
    user.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });
    await user.click(incrementButton);

    const countEle = screen.getByRole("heading");
    expect(countEle).toHaveTextContent("1");
  });

  it("renders a count of 2 after clicking the increment button twice", async () => {
    user.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole("button", {
      name: "Increment",
    });
    await user.click(incrementButton);
    await user.click(incrementButton);

    const countEle = screen.getByRole("heading");
    expect(countEle).toHaveTextContent("2");
  });

  it("renders a count of 10 after typing 10 in amount input and clicking the set button", async () => {
    user.setup();
    render(<Counter />);

    const amountInput = screen.getByRole("spinbutton");
    await user.type(amountInput, "10");
    expect(amountInput).toHaveValue(10);

    const setButton = screen.getByRole("button", {
      name: "Set",
    });
    await user.click(setButton);
    const countEle = screen.getByRole("heading");
    expect(countEle).toHaveTextContent("10");
  });
});
