import { createContext, useContext, useEffect, useState } from "react";

const LS_KEY = "bookflix:favorites";
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const isFavorite = (id) => favorites.some((b) => b.id === id);

  const addFavorite = (book) =>
    setFavorites((prev) => (isFavorite(book.id) ? prev : [...prev, book]));

  const removeFavorite = (id) =>
    setFavorites((prev) => prev.filter((b) => b.id !== id));

  const toggleFavorite = (book) =>
    isFavorite(book.id) ? removeFavorite(book.id) : addFavorite(book);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
