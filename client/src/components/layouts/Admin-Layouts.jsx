import { FaBowlFood, FaHouse, FaUsers } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/">
                  <FaHouse />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/users">
                  <FaUsers />
                  users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/foods">
                  <FaBowlFood />
                  foods
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
