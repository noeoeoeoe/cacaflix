import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="Header-container">
      <div id="logo">Adopte un film</div>
      <div className="links">
      <Link className="Link" to="/">
        Home
      </Link>
      <Link className="Link" to="/counter">
        Pour vous
      </Link>
      <Link className="Link" to="/users">
        Users
      </Link>
      <Link className="Link" to="/about">
        About
      </Link>
      </div>
    </header>
  );
};

export default Header;
