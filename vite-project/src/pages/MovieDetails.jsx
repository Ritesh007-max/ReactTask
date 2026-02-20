import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=718ce793&i=${id}`
    );
    const data = await res.json();
    setMovie(data);
  };

  const addToFavorites = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favs.includes(id)) {
      favs.push(id);
      localStorage.setItem("favorites", JSON.stringify(favs));
      alert("Added to favorites!");
    }
  };

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="details">
      <img src={movie.Poster} alt={movie.Title} />
      <div>
        <h2>{movie.Title}</h2>
        <p>Year: {movie.Year}</p>
        <p>Genre: {movie.Genre}</p>
        <p>Rating: {movie.imdbRating}</p>
        <p>{movie.Plot}</p>

        <button onClick={addToFavorites}>Add to Favorites</button>
      </div>
    </div>
  );
}

export default MovieDetails;