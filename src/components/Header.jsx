import { Link } from "react-router-dom";
import logo from "../assets/bookflix-logo.png";

export default function Header({ q, setQ, search }) {
  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  return (
    <header>
      <div className="header-top">
        <Link to="/" className="logo">
          <img src={logo} alt="Bookflix logo" />
        </Link>

        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        >
          <input
            type="text"
            placeholder="Search for books..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <nav>
        <Link to="/">Home</Link>

        {categories.map((cat) => (
          <Link key={cat} to={`/category/${cat.toLowerCase()}`}>
            {cat}
          </Link>
        ))}

        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
}
