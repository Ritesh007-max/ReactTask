import { useEffect, useState } from "react";

function Favorites() {
  const [movies, setMovies] = useState([]);

  const loadFavorites = async () => {
    const favIds = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favIds.length === 0) {
      setMovies([]);
      return;
    }

    const favMovies = await Promise.all(
      favIds.map(async (id) => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=718ce793&i=${id}`
        );
        return res.json();
      })
    );

    setMovies(favMovies);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFromFavorites = (id) => {
    let favIds = JSON.parse(localStorage.getItem("favorites")) || [];

    const updatedFavs = favIds.filter((favId) => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));

    loadFavorites(); // refresh UI immediately
  };

  if (movies.length === 0) {
    return <h2>No favorite movies added.</h2>;
  }

  return (
    <div className="grid">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="card">
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <button onClick={() => removeFromFavorites(movie.imdbID)} className="buttons">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;