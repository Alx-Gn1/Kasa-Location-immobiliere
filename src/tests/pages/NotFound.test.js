import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import NotFound from "../../pages/NotFound";

describe("NotFound", () => {
  const routes = [
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/404"],
  });
  it("Should render without crash", () => {
    render(<RouterProvider router={router} />);
  });
});
