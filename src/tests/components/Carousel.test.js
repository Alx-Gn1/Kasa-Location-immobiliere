import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Carousel from "../../components/Carousel";

import DUMMY_DATA from "../../utils/Datas/logements.json";

describe("Carousel", () => {
  it("Should render without crash", () => {
    render(<Carousel />);
  });
  it("Should render the array of images the has been passed to the function", () => {
    const images = DUMMY_DATA[0].pictures;
    render(<Carousel images={images} />);

    const carouselSlides = screen.getAllByTestId("carouselSlide");

    expect(carouselSlides).toHaveLength(images.length);
    carouselSlides.forEach((slide, index) => {
      // Le lien/source de l'image est formatté pour garder le nom du fichier, sans extension
      const src = images[index];
      const alt = src.split("/").at(-1).split(".").slice(0, -1).join(".");

      expect(slide).toHaveAttribute("src", src);
      expect(slide).toHaveAttribute("alt", alt);
    });
    // La 1e image est active par défaut
    expect(carouselSlides[0]).toHaveClass("center");
  });
  it("Should loop trough images when you increment or decrement the state", async () => {
    const images = DUMMY_DATA[0].pictures;
    // on récupère la fonction dispatch pour pouvoir l'exécuter ici
    let mockDispatch;
    const testDispatch = (dispatch) => {
      mockDispatch = dispatch;
    };
    // même chose pour le state
    let CurrentState;
    const testGetCurrentState = (state) => {
      CurrentState = state;
    };
    render(<Carousel images={images} testDispatch={testDispatch} testGetCurrentState={testGetCurrentState} />);

    // On commence avec l'image 0
    expect(CurrentState).toEqual({ currentImage: 0 });

    // On vérifie qu'en enlevant 1 on se retrouve à la dernière image et non à -1
    act(() => {
      mockDispatch("decrement");
    });
    expect(CurrentState).toEqual({ currentImage: images.length - 1 });
    // Quand on rajoute à nouveau 1 on revient à l'image 0
    act(() => {
      mockDispatch("increment");
    });
    expect(CurrentState).toEqual({ currentImage: 0 });
  });
  it("Should go to next image when click on next button", async () => {
    const images = DUMMY_DATA[0].pictures;
    render(<Carousel images={images} />);
    const nextButton = screen.getByTestId("carouselNext");
    const carouselSlides = screen.getAllByTestId("carouselSlide");

    fireEvent.click(nextButton);
    // Rappel : l'image actuellement affichée est carouselSlides[0]
    // Rappel : l'image est placée à droite avec la class right, ensuite on lui applique la classe "center" avec un timeout, le css s'occupe de la transition
    expect(carouselSlides[1]).toHaveClass("right");

    await waitFor(() => expect(carouselSlides[1]).toHaveClass("center"));
    await waitFor(() => expect(carouselSlides[0]).toHaveClass("left"));
  });
  it("Should go to prev image when click on prev button", async () => {
    const images = DUMMY_DATA[0].pictures;
    render(<Carousel images={images} />);
    const prevButton = screen.getByTestId("carouselPrev");
    const carouselSlides = screen.getAllByTestId("carouselSlide");

    fireEvent.click(prevButton);
    // Rappel : l'image actuellement affichée est carouselSlides[0]
    // Rappel : l'image est placée à droite avec la class right, ensuite on lui applique la classe "center" avec un timeout, le css s'occupe de la transition
    expect(carouselSlides.at(-1)).toHaveClass("left");

    await waitFor(() => expect(carouselSlides.at(-1)).toHaveClass("center"));
    await waitFor(() => expect(carouselSlides[0]).toHaveClass("right"));
  });
});
