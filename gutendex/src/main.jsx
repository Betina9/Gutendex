import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
//Router components
import App from "./App.jsx";
import HomePage from "./pages/Homepage.jsx";
import BookPage from "./pages/BookPage.jsx";
import ProductsPage from "./pages/BooksPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>Error</p>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/books",
        element: <ProductsPage />,
      },
      {
        path: "/books/:bookId",
        element: <BookPage />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 - Not Found</p>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
