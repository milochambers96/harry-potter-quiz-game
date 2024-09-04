import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import StartGame from "./components/StartGame.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/start-game", element: <StartGame /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
