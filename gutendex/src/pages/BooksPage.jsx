import { useEffect, useState } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://gutendex.com/books")
      .then((response) => response.json())
      .then((data) => setBooks(data.results));
  }, []);

  return (
    <div>
      <h2>Our books:</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}
