import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar has-background-primary-25">
        <div className="navbar-menu is-active" id="navbarItems">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/leaderboard">
            Leaderboard
          </Link>
        </div>
      </nav>
      ;
    </>
  );
}

export default NavBar;
