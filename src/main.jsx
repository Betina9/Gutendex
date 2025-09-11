import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import BookPage from "./pages/BookPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

import { FavoritesProvider } from "./favorites.jsx";
import "./App.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <p>Error</p>,
      children: [
        { index: true, element: <HomePage /> },
        { path: "category/:topic", element: <BooksPage /> },
        { path: "book/:bookId", element: <BookPage /> },
        { path: "favorites", element: <FavoritesPage /> },
      ],
    },
    { path: "*", element: <p>404 - Not Found</p> },
  ],
  { basename: "/gutendex" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  </React.StrictMode>
);
