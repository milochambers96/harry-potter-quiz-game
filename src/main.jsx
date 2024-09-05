import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Leaderboard from "./components/LeaderBoard.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/leaderboard", element: <Leaderboard /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
