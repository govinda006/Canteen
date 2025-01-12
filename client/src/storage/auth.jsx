import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error handling state
  const authorizationToken = `Bearer ${token}`;

  // Effect to update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Function to store the token
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
  };

  // Function to log out the user
  const LogoutUser = () => {
    setToken(""); // Clear the token
    setUser(null); // Clear the user data
    window.location.href = "/Adminlogin"; // Redirect to login
  };

  // Function to authenticate the user
  const userAuthentication = async () => {
    try {
      if (!token) {
        throw new Error("No token available");
      }
      const response = await fetch(`${window.location.origin}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data.userData);
        setUser(data.userData);
      } else {
        const errorData = await response.json();
        console.error("Authentication failed:", errorData);
        setError("Failed to authenticate user: " + errorData.message);
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
      setError("Failed to authenticate user");
    }
  };

  // Function to fetch all food items
  const getFoods = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/food/Home`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setFoods(data.message);
      } else {
        const errorData = await response.json();
        console.error("Error fetching food items:", errorData);
        setError("Failed to load food items: " + errorData.message);
      }
    } catch (error) {
      console.log(`Error fetching food items:, ${error}`);
      setError("Failed to load food items");
    } finally {
      setLoading(false); // Stop loading when data is fetched or error occurs
    }
  };

  // Effect to fetch food items and authenticate user on component mount
  useEffect(() => {
    getFoods();
    if (token) {
      userAuthentication();
    }
  }, []); // Trigger only when the token changes

  // Determine if the user is logged in
  const isLoggedIn = !!token;

  // Provide the authentication context to children
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        foods,
        loading,
        error,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};

export default AuthContext;
