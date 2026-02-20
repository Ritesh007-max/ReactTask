import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("batman");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    fetchMovies(search);
  }, []);

  const fetchMovies = async (query) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=718ce793&s=${query}`,
    );
    const data = await res.json();
    if (data.Search) {
      setMovies(data.Search);
    }
  };

  const handleSearch = () => {
    fetchMovies(search);
  };

  const addToFavorites = (id) => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favs.includes(id)) {
      favs.push(id);
      localStorage.setItem("favorites", JSON.stringify(favs));
      alert("Added to favorites!");
    }
  };

  const filteredMovies = yearFilter
    ? movies.filter((movie) => movie.Year.includes(yearFilter))
    : movies;

  return (
    <div className="container">
      <h2>Search Movies</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

        <input
          type="text"
          placeholder="Filter by Year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />
      </div>
      <div className="grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            addToFavorites={addToFavorites}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
