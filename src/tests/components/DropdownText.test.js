import { fireEvent, render, screen } from "@testing-library/react";
import DropdownText from "../../components/DropdownText";

describe("DropdownText", () => {
  it("Should render without crash", () => {
    render(<DropdownText />);
  });
  it("Should be closed on first render", () => {
    render(<DropdownText />);
    expect(screen.getByTestId("openButton")).toHaveAttribute("class", "openButton");
    expect(screen.getByTestId("content")).toHaveAttribute("class", "dropdownContent");
  });
  it("Should open itself when the button is clicked, then close itself when clicked again", () => {
    render(<DropdownText />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(screen.getByTestId("openButton")).toHaveAttribute("class", "openButton active");
    expect(screen.getByTestId("content")).toHaveAttribute("class", "dropdownContent active");

    fireEvent.click(button);
    expect(screen.getByTestId("openButton")).toHaveAttribute("class", "openButton");
    expect(screen.getByTestId("content")).toHaveAttribute("class", "dropdownContent");
  });
  it("Should render the title in the button", () => {
    const mockTitle = "Test Title";
    render(<DropdownText title={mockTitle} />);

    expect(screen.getByTestId("openButton")).toHaveTextContent(mockTitle);
  });
  it("Should render the content in dropdownContent div", () => {
    const mockContent = "Test Content";
    render(<DropdownText content={mockContent} />);

    expect(screen.getByTestId("content")).toHaveTextContent(mockContent);
  });
});
