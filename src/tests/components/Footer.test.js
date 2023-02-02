import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer", () => {
  it("Should render without crash", () => {
    render(<Footer />);
  });
  it("Should contain an Image of the Kasa logo", () => {
    render(<Footer />);
    expect(screen.getAllByRole("img").length).toEqual(1);
    expect(screen.getByRole("img")).toHaveAttribute("src", "kasa-logo-white.svg");
  });
  it("Should contain a copyright notice", () => {
    render(<Footer />);
    expect(screen.getByTestId("copyrightNotice")).toHaveTextContent("© 2020 Kasa. All rights reserved");
  });
});
