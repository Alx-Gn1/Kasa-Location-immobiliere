import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "../pages/AboutUs";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import RentPage from "../pages/RentPage";
import Footer from "./Footer";
import Header from "./Header";

/**
 * Router de l'application
 */
const RouterLayout = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        { path: "", element: <Home /> },
        { path: "about", element: <AboutUs /> },
        { path: "rent/:id", element: <RentPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={browserRouter} />
      <Footer />
    </>
  );
};
export default RouterLayout;
