import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <section id="error-page">
        <div className="content">
          <div className="header">
            <h2>404</h2>
            <h4>Sorry! Page not found</h4>
            <p>
              You are accessing a page that does not exist. Please go back to
              the home page.
            </p>
            <div className="btns">
              <NavLink to="/">return home</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
