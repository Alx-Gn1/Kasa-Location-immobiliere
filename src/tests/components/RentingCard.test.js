import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { RentingCard } from "../../components/RentingCard";
import DUMMY_DATA from "../../utils/Datas/logements.json";

describe("RentingCard", () => {
  const routes = [
    {
      path: "/Home",
      element: <RentingCard data={DUMMY_DATA[0]} index={0} />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/Home"],
  });
  it("Should render without crash", () => {
    render(<RouterProvider router={router} />);
  });
});
