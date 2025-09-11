import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../favorites.jsx";

const PAGE_SIZE = 32;

function getPageFromUrl(u) {
  if (!u) return 1;
  try {
    const url = new URL(u);
    return Number(url.searchParams.get("page")) || 1;
  } catch {
    return 1;
  }
}

export default function BooksPage() {
  const { topic } = useParams();
  const [data, setData] = useState({
    results: [],
    next: null,
    previous: null,
    count: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  const { isFavorite, toggleFavorite } = useFavorites();

  const page = currentUrl ? getPageFromUrl(currentUrl) : 1;
  const totalPages = data.count ? Math.ceil(data.count / PAGE_SIZE) : null;

  async function load(url) {
    const endpoint =
      url ||
      `https://gutendex.com/books?topic=${encodeURIComponent(
        (topic || "").toLowerCase()
      )}`;
    try {
      setLoading(true);
      setError("");
      setCurrentUrl(endpoint);
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData({
        results: json.results ?? [],
        next: json.next ?? null,
        previous: json.previous ?? null,
        count: json.count ?? 0,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setData({ results: [], next: null, previous: null, count: 0 });
    setCurrentUrl("");
    load();
  }, [topic]);

  if (loading && data.results.length === 0)
    return <p className="loading">Loading books…</p>;
  if (error) return <p className="error">Wrong: {error}</p>;

  return (
    <section className="books-page">
      <h2>
        {(topic || "").charAt(0).toUpperCase() + (topic || "").slice(1)} books
        {data.count ? ` · ${data.count} hits` : ""}
        {data.count > 0
          ? ` · page ${page}${totalPages ? ` of ${totalPages}` : ""}`
          : ""}
      </h2>

      {data.results.length === 0 ? (
        <p>No books found in this category.</p>
      ) : (
        <ul className="book-list">
          {data.results.map((b) => {
            const cover = b.formats?.["image/jpeg"];
            const authors =
              b.authors?.map((a) => a.name).join(", ") || "Unknown author";

            const favPayload = {
              id: b.id,
              title: b.title,
              authors,
              cover,
            };

            return (
              <li key={b.id} className="book-item">
                <Link
                  to={`/book/${b.id}`}
                  className="book-link"
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  {cover && (
                    <img
                      src={cover}
                      alt={b.title}
                      className="book-thumb"
                      style={{ width: 60, height: "auto", flexShrink: 0 }}
                    />
                  )}
                  {b.title}
                </Link>
                <div className="book-authors">
                  {b.authors?.map((a) => a.name).join(", ") || "Unknown author"}
                  <button
                    className={`fav-btn ${isFavorite(b.id) ? "on" : ""}`}
                    onClick={() => toggleFavorite(favPayload)}
                    aria-label={
                      isFavorite(b.id) ? "Remove favorite" : "Add to favorites"
                    }
                    title={
                      isFavorite(b.id) ? "Remove favorite" : "Add to favorites"
                    }
                  >
                    {isFavorite(b.id) ? "♥" : "♡"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {data.count > 0 && (
        <div className="pagerBottom">
          <button
            className="prevButton"
            disabled={!data.previous}
            onClick={() => load(data.previous)}
          >
            Previous
          </button>
          <span>{`Page ${page}${totalPages ? ` of ${totalPages}` : ""}`}</span>
          <button
            className="nextButton"
            disabled={!data.next}
            onClick={() => load(data.next)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
