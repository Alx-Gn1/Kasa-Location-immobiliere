import { render, screen } from "@testing-library/react";
import AboutUs from "../../pages/AboutUs";
import collapsesDatas from "../../utils/Datas/collapses.json";

describe("AboutUs", () => {
  it("Should render without crash", () => {
    render(<AboutUs />);
  });

  it("Should contain an image banner", () => {
    render(<AboutUs />);
    // Vérifie la présence de la bannière d'image
    expect(screen.getByTestId("imageBanner")).toBeInTheDocument();
  });
  it("Should render 4 collapses, whose text content is saved in collapses.json", () => {
    render(<AboutUs />);

    // Vérifie la présence d'un component par collapse définie dans collapses.json
    const collapsesList = collapsesDatas;
    collapsesList.forEach(({ title, content }) => {
      expect(screen.getByTitle(title)).toHaveTextContent(title);
      expect(screen.getByText(content)).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("collapse").length).toEqual(collapsesList.length);
  });
});
