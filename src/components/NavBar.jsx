import { NavLink } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar-logo">Pulse Polls</div>
      <ul className="sidebar-links">
        <li>
          <NavLink to="/" end>
            Browse polls
          </NavLink>
        </li>
        <li>
          <NavLink to="/create">Create poll</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar
