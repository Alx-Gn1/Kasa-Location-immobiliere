import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import RentPage from "../../pages/RentPage";
import DUMMY_DATA from "../../utils/Datas/logements.json";

// En arrivant sur la page d'acceuil l'utilisateur est redirigé en haut de la page
// Jest lance une erreur et ne connait pas la fonction
Object.defineProperty(window, "scrollTo", { value: () => {}, writable: true });
// Creation du memory router pour les test

describe("RentPage", () => {
  const routes = [
    {
      path: "/rent/:id",
      element: <RentPage timeout={10} />,
    },
  ];

  it("Should render without crash", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/rent/${DUMMY_DATA[0].id}`],
    });
    render(<RouterProvider router={router} />);
  });

  it("Should render skeleton Ui first", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/rent/${DUMMY_DATA[0].id}`],
    });
    render(<RouterProvider router={router} />);

    // Carousel should be a loading anim instead of the real component
    expect(screen.getByTestId("CarouselLoading")).toBeInTheDocument();
    expect(screen.queryByTestId("CarouselLoaded")).not.toBeInTheDocument();

    // Le titre est Loading et le sous titre / localisation est un tiret
    expect(screen.getByTestId("rentTitle")).toHaveTextContent("Loading...");
    expect(screen.getByTestId("rentLocation")).toHaveTextContent("-");
  });
  it("Should get the id of the rent in url params and display that rent on the page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [`/rent/${DUMMY_DATA[0].id}`],
    });
    render(<RouterProvider router={router} />);

    // On test ici la route pour DUMMY_DATA[0] soit la 1e location dans la db

    // On attend que les données soient chargées
    const carousel = await screen.findByTestId("CarouselLoaded");
    expect(carousel).toBeInTheDocument();

    expect(screen.getByTestId("rentTitle")).toHaveTextContent(DUMMY_DATA[0].title);
    expect(screen.getByTestId("rentLocation")).toHaveTextContent(DUMMY_DATA[0].location);
  });
});
