import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Bookflix</h1>
      <input type="text" placeholder="Søk etter bøker..." />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">Fiction</Link>
        <Link to="/products/dffsd"> Mystery</Link>
        <Link to="/">Thriller</Link>
        <Link to="/">Romance</Link>
        <Link to="/">Fantasy</Link>
        <Link to="/">Morality</Link>
        <Link to="/">Society</Link>
        <Link to="/">Power</Link>
        <Link to="/">Justice</Link>
        <Link to="/">Adventure</Link>
        <Link to="/">Tragedy</Link>
        <Link to="/">War</Link>
        <Link to="/">Philosophy</Link>
      </nav>
    </header>
  );
}

//søkefelt for å søke etter bøker, meny for kategorier, favoritter skal fremmes
