import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Bounce, ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./storage/auth.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </StrictMode>
  </AuthProvider>
);
