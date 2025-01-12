import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../storage/auth";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  useEffect(() => {
    LogoutUser();
    toast.success("You have been logged out successfully.");
  }, [LogoutUser]);

  return <Navigate to="/Adminlogin" />;
};
