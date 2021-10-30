import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import './Dashboard.css';

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <div className="dashboardTop">
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="currentUser"><strong> {currentUser.email}</strong></div>
        <div className="profileUpdate">
          <Link to="/update-profile" className="link">
            Update Profile
          </Link>
        </div>
        <div className="logout">
          <Link to="/" onClick={handleLogout} className="link">
            Logout
          </Link>
        </div>

      </div>


    </>
  )
}