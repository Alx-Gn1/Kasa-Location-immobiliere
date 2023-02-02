import Home from "../../pages/Home";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { useDummyData } from "../../utils/hooks/useDummyData";
import DUMMY_DATA from "../../utils/Datas/logements.json";

// afterEach(() => {
//   // restaure l'espion créé avec spyOn
//   jest.restoreAllMocks();
// });

describe("Home", () => {
  it("Should render Skeleton Ui while data are fetching", async () => {
    render(<Home />);
    // Vérifie la présence de la bannière d'image
    expect(screen.getByTestId("imageBanner")).toBeTruthy();
    // On affiche l'ui de loading mais pas le vrai component
    screen.getAllByTestId("rentingCardSkeleton").forEach((card) => expect(card).toBeInTheDocument());
    screen.queryAllByTestId("rentingCard").forEach((card) => expect(card).not.toBeInTheDocument());
  });

  it("Should render a list of rent when data are fetched", async () => {
    // Les cartes finissent par charger et les skeleton card ne s'affichent plus
    screen.queryAllByTestId("rentingCard").forEach((card) => waitFor(() => expect(card).toBeInTheDocument()));
    screen.queryAllByTestId("rentingCardSkeleton").forEach((card) => waitFor(() => expect(card).toBeFalsy()));

    // Vérifie la présence d'une carte par id de location
    const locationIds = DUMMY_DATA.map((location) => location.id);
    locationIds.forEach((id) => waitFor(() => expect(screen.getByTitle(id)).toBeInTheDocument()));
  });
});
