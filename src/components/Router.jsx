import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "../pages/AboutUs";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import RentPage from "../pages/RentPage";
import Footer from "./Footer";
import Header from "./Header";

const RouterLayout = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <Home /> },
        { path: "about", element: <AboutUs /> },
        { path: "rent/:id", element: <RentPage /> },
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
