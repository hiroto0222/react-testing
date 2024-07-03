import { render, screen } from "@testing-library/react";
import { Application } from "./Application";

describe("Application", () => {
  it("renders correctly", () => {
    render(<Application />);

    const pageHeading = screen.getByRole("heading", {
      name: "Job application form",
      level: 1,
    });
    expect(pageHeading).toBeInTheDocument();

    const sectionHeading = screen.getByRole("heading", {
      name: "Section 1",
      level: 2,
    });
    expect(sectionHeading).toBeInTheDocument();

    const nameEle = screen.getByRole("textbox", { name: "Name" });
    expect(nameEle).toBeInTheDocument();

    const nameEle2 = screen.getByLabelText("Name", {
      selector: "input",
    });
    expect(nameEle2).toBeInTheDocument();

    const bioEle = screen.getByRole("textbox", { name: "Bio" });
    expect(bioEle).toBeInTheDocument();

    const jobLocationEle = screen.getByRole("combobox");
    expect(jobLocationEle).toBeInTheDocument();

    const termsEle = screen.getByRole("checkbox");
    expect(termsEle).toBeInTheDocument();

    const termsEle2 = screen.getByLabelText(
      "I agree to the terms and conditions"
    );
    expect(termsEle2).toBeInTheDocument();

    const submitButtonEle = screen.getByRole("button");
    expect(submitButtonEle).toBeInTheDocument();
  });
});