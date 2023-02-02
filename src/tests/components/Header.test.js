import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Header from "../../components/Header";

describe("RentingCard", () => {
  const routes = [
    {
      path: "/",
      element: <Header />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });
  it("Should render without crash", () => {
    render(<RouterProvider router={router} />);
  });
});
