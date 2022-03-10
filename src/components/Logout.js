import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FirebaseContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.log("Logout failed");
    }
  }, []);

  return <div>Logout</div>;
}
