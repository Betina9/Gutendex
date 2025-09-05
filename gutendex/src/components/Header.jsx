import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Bookflix</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products/dffsd">Book Page</Link>
      </nav>
      <input type="text" />
    </header>
  );
}

//søkefelt for å søke etter bøker, meny for kategorier, favoritter skal fremmes
