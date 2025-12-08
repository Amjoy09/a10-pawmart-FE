import { createBrowserRouter } from "react-router";
import RootLayout from "../root/RootLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Services from "../pages/Services";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyProfile from "../pages/MyProfile";
import PrivateRoute from "./PrivateRoute";
import ServiceDetails from "../pages/ServiceDetails";
import ForgetPassword from "../pages/ForgetPassword";
import AddService from "../pages/AddService";
import MyServices from "../pages/MyServices";
import UpdateService from "../pages/UpdateService";
import MyOrders from "../pages/MyOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <p>Loading...</p>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:myId",
        element: (
          <PrivateRoute>
            {" "}
            <ServiceDetails></ServiceDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/forget/:email",
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-services",
        element: (
          <PrivateRoute>
            <MyServices></MyServices>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-service/:id",
        element: <UpdateService></UpdateService>,
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
