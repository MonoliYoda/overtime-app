import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../withContext";

function Logout(props) {
  const fb = { ...props.value };
  const navigate = useNavigate();

  useEffect(() => {
    async function tryLogout() {
      try {
        await fb.logout();
        navigate("/login");
      } catch (e) {
        console.log("Logout failed");
      }
    }
    tryLogout();
  }, []);

  return <div>Logout</div>;
}

export default withContext(Logout);
