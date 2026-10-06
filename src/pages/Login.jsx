import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const success = login(username, password, role);

    if (!success) {
      setError("Invalid username, password or role.");
      return;
    }

    setError("");

    if (role === "admin") {
      navigate("/");
    } else if (role === "supervisor") {
      navigate("/supervisor");
    } else if (role === "faculty") {
      navigate("/faculty");
    } else if (role === "student") {
      navigate("/student");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">
  <h1>SRM Easwari Engineering College</h1>
  <h2>Swachhta</h2>
  <p>Green Compliance Monitoring</p>
</div>

        <h2>Login</h2>

        <p className="login-subtitle">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin}>

          <label>Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="supervisor">Supervisor</option>
            <option value="faculty">Faculty In-Charge</option>
            <option value="student">Student</option>
          </select>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;