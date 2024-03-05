import React from "react";
import ReactDOM from "react-dom";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ErrorTemplate from "./containers/ErrorTemplate/ErrorTemplate";
import UserProfile from "./containers/UserProfile/UserProfile";
import Home from "./containers/Home/Home";
import Layout from "./Layout";

import "./App.css";

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/:username" element={<UserProfile />} />
      <Route path="*" element={<ErrorTemplate />} />
    </Route>
  )
);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={Routes} />
  </React.StrictMode>,
  document.getElementById("root")
);
