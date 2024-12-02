import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import AppLayout from "./AppLayout/AppLayout";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import AboutPage from "./Pages/AboutPage";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import Contact from "./Pages/ContactPage";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Dashboard from "./Pages/DashboardPage";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import Error from "./Pages/Error";
import { ACCOUNT_TYPE } from "./utils/constants";

const App = () => {
  // Accessing user state using useSelector
  const { user } = useSelector((state) => state.profile);

  // Define routes based on the user's account type
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/login",
          element: (
            <OpenRoute>
              <LoginPage />
            </OpenRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <OpenRoute>
              <SignupPage />
            </OpenRoute>
          ),
        },
        {
          path: "/about",
          element: (
            <OpenRoute>
              <AboutPage />
            </OpenRoute>
          ),
        },
        {
          path: "/forgot-password",
          element: (
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          ),
        },
        {
          path: "/update-password/:id",
          element: (
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          ),
        },
        {
          path: "/verify-email",
          element: (
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          ),
        },
        { path: "/contact", element: <Contact /> },
        {
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
          children: [
            { path: "dashboard/my-profile", element: <MyProfile /> },
            { path: "dashboard/settings", element: <Settings /> },
            ...(user?.accountType === ACCOUNT_TYPE.STUDENT
              ? [
                  { path: "dashboard/cart", element: <Cart /> },
                  {
                    path: "dashboard/enrolled-courses",
                    element: <EnrolledCourses />,
                  },
                ]
              : []),
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
