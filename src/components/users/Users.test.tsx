import { render, screen } from "@testing-library/react";
import { Users } from "./Users";

describe("Users", () => {
  it("renders correctly", () => {
    render(<Users />);
    const textEle = screen.getByText("Users");
    expect(textEle).toBeInTheDocument();
  });

  it("renders a list of users", async () => {
    render(<Users />);
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(3);
  });
});
