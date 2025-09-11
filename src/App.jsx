import "./App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [q, setQ] = useState("");
  const [data, setData] = useState({ results: [], next: null, previous: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(url) {
    try {
      setLoading(true);
      setError("");
      const endpoint =
        url ?? `https://gutendex.com/books?search=${encodeURIComponent(q)}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
    } catch (e) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header q={q} setQ={setQ} search={search} />
      <main className="app-main">
        <Outlet context={{ data, loading, error, search }} />
      </main>
      <Footer />
    </>
  );
}
