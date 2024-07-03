import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/server";
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

  it("renders error", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<Users />);
    const error = await screen.findByText("Error fetching users");
    expect(error).toBeInTheDocument();
  });
});
