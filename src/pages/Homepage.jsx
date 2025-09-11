import { useOutletContext, Link } from "react-router-dom";

export default function HomePage() {
  const { data, loading, error, search } = useOutletContext();

  return (
    <section className="home">
      <h2>Welcome to Bookflix!</h2>
      <p>Search for a book in the field above 👆</p>
      <p>Or click on your favorite category!</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {data.results.map((b) => (
          <li key={b.id}>
            <Link to={`/book/${b.id}`}></Link>
            <div>
              {(b.authors?.map((a) => a.name), join(", ") || "Unknown author")}
            </div>
          </li>
        ))}
      </ul>

      {data.results.lenght > 0 && (
        <div>
          <button
            disabled={!data.previous}
            onClick={() => search(data.previous)}
          >
            previous
          </button>
          <button disabled={!data.next} onClick={() => search(data.next)}>
            Next
          </button>
        </div>
      )}
    </section>
  );
}
