import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../storage/auth";

const LOGIN_URL = `http://localhost:5000/api/auth/login`;

export const AdminLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        storeTokenInLS(res_data.token); // Save the token
        setUser({ email: "", password: "" }); // Reset the form
        navigate("/admin/users"); // Redirect to the homepage
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("Invalid Credentials");
      }
    } catch (error) {
      toast.error("Error during login");
      console.error("Error during login:", error);
    }
  };

  return (
    <section>
      <main>
        <div className="admin-login-section">
          <div className="container grid grid-two-cols">
            {/* Login Image */}
            <div className="login-image">
              <img
                src="/images/GECIA-CANTEEN.png"
                alt="Admin Login Illustration"
                width="700"
                height="700"
              />
              <p className="image-text">Welcome to the Admin Login Portal</p>
            </div>

            {/* Login Form */}
            <div className="login-form">
              <h1 className="main-heading mb-3">Admin Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>

                <button type="submit" className="btn btn-submit">
                  Login as Admin
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AdminLogin;
