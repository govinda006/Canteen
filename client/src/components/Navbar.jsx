import { NavLink } from "react-router-dom";
import { useAuth } from "../storage/auth";
import "./NavBar.css";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header>
      <div className="container">
        <div className="logoBrand">
          <NavLink to="/">
            <img src="/images/Atlas-Logo.png" alt="Atlas-Group-Logo" />
          </NavLink>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink to="/Adminlogin">Admin</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to="/Logout">Logout</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
