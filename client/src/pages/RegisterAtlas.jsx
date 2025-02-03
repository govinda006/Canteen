import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "../components/Navbar.css";
import { useAuth } from "../storage/auth";
const REGISTER_URL = "http://localhost:3000/api/auth/register"; // Renamed URL constant

export const AdminRegister = () => {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("res from server", res_data.extraDetails);

      if (response.ok) {
        toast.success("Registration Successful"); // Use toast for success message
        if (storeTokenInLS) {
          storeTokenInLS(res_data.token);
        }
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/Adminlogin");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        ); // Use toast for error message
        console.log("Registration failed:", res_data.message);
      }
      console.log(response);
    } catch (error) {
      toast.error("Error during registration"); // Use toast for error message
      console.log("Error during registration:", error);
    }
  };

  return (
    <section>
      <main>
        <div className="section-register">
          <div className="container grid grid-two-cols">
            {/* Image */}
            <div className="register-image">
              <img
                src="/images/GECIA-CANTEEN.png" // Ensure this path is correct
                alt="Admin Register Illustration"
                width="700"
                height="700"
              />
              {/* Text Below the Image */}
              <p className="image-text">Welcome to the Admin Register Portal</p>
            </div>

            {/* Register Form */}
            <div className="login-form">
              <h1 className="main-heading mb-3">Admin Register</h1>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    id="username"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter your phone"
                    id="phone"
                    required
                    autoComplete="off"
                    value={user.phone}
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

                <br />
                {/* Submit Button */}
                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AdminRegister;
