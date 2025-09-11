import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../favorites.jsx";

export default function BookPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    let ignore = false;

    async function fetchBook() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`https://gutendex.com/books/${bookId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (!ignore) setBook(data);
      } catch (err) {
        if (!ignore) setError(err.message || "Unknown error");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchBook();
    return () => {
      ignore = true;
    };
  }, [bookId]);

  if (loading) return <p>Loading bookdata…</p>;
  if (error) return <p>Something went wrong: {error}</p>;
  if (!book) return null;

  const cover =
    book.formats?.["image/jpeg"] || book.formats?.["image/png"] || null;
  const readUrl =
    book.formats?.["text/html"] || book.formats?.["application/pdf"] || null;

  const authorsStr = book.authors?.map((a) => a.name).join(", ") || "Unknown";

  const favPayload = {
    id: book.id,
    title: book.title,
    authors: authorsStr,
    cover,
  };

  return (
    <article className="book-detail">
      <h1>{book.title}</h1>

      {cover && (
        <img
          src={cover}
          alt={book.title}
          style={{
            maxWidth: 300,
            height: "auto",
            display: "block",
            marginBottom: 12,
          }}
        />
      )}

      <p>
        <b>Authors(e):</b>{" "}
        {book.authors?.map((a) => a.name).join(", ") || "Unknown"}
      </p>
      <p>
        <b>Languages:</b> {book.languages?.join(", ") || "—"}
      </p>
      <p>
        <b>Downloads:</b> {book.download_count ?? 0}
      </p>
      <p>
        <b>Category:</b> {book.bookshelves?.join(", ") || "None"}
      </p>

      {readUrl && (
        <p>
          <a href={readUrl} target="_blank" rel="noreferrer">
            Read the book here
          </a>
        </p>
      )}

      <button
        className={`fav-btn ${isFavorite(book.id) ? "on" : ""}`}
        onClick={() => toggleFavorite(favPayload)}
      >
        {isFavorite(book.id) ? "Remove from favorites ♥" : "Save as favorite ♡"}
      </button>
    </article>
  );
}
