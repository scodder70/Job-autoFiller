import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard"; // Correctly import the component
import FileUpload from "./pages/Hello";
import SignUp from "./pages/SignUp";
import PDFUploader from "./pages/Hello";
import HI from "./pages/HI";
import { Velustro } from "uvcanvas";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <DashBoard></DashBoard>,
    },
    {
      path: "/sign",
      element: <SignUp />,
    },
    {
      path: "/check",
      element: <HI />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
