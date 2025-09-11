import { Link } from "react-router-dom";
import { useFavorites } from "../favorites.jsx";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="books-page">
        <h2>Favorites</h2>
        <p>No favorite books yet.</p>
      </section>
    );
  }

  return (
    <section className="books-page">
      <h2>Favorites ({favorites.length})</h2>
      <ul className="book-list">
        {favorites.map((b) => (
          <li key={b.id} className="book-item">
            <div
              className="book-row"
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              {b.cover && (
                <img
                  src={b.cover}
                  alt={b.title}
                  className="book-thumb"
                  style={{ width: 60, height: "auto", flexShrink: 0 }}
                />
              )}

              <div className="book-meta" style={{ flex: 1, minWidth: 0 }}>
                <Link to={`/book/${b.id}`} className="book-link">
                  {b.title}
                </Link>
                <div className="book-authors">{b.authors}</div>
              </div>

              <button
                className="fav-btn on"
                onClick={() => removeFavorite(b.id)}
              >
                Remove ♥
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
