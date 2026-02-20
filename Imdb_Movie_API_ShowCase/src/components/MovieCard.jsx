import { Link } from "react-router-dom";

function MovieCard({ movie, addToFavorites }) {
  return (
    <div className="card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <div className="btn">
        <Link to={`/movie/${movie.imdbID}`}>
          <button className="buttons">View Details</button>
        </Link>

        <button
          onClick={() => addToFavorites(movie.imdbID)}
          className="buttons"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
