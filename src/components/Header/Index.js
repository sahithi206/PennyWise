import React, { useEffect } from "react";
import "./index.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userImg from "../assets/user.svg";

function Index() {
  const [users] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
  
    if (users) {
      navigate("/dashboard");
    }
  }, [users, navigate]);

  const logout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged Out Successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar">
      <p className="logo">PennyWise.</p>
      {users && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src={users.photoURL ? users.photoURL : userImg}
            alt="User"
            style={{ borderRadius: "50%", width: "1.5rem", height: "1.5rem",marginRight:"0.5rem" }}
            onError={(e) => {
              e.target.src = userImg; // Fallback if user photoURL fails to load
            }}
          />
          <p className="logo link" style={{marginRight:"3rem"}} onClick={logout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Index;