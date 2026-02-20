import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setCount(favs.length);
  }, []);

  return (
    <nav className="navbar">
      <h2>Movie Explorer</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites ({count})</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;