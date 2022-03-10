import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FirebaseContext";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      console.log("not logged in, redirecting");
      navigate("/login");
    }
  }, []);

  return <div>Dashboard</div>;
}
