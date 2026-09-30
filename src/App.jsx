import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://172.17.21.147:8080";

function App() {
  const [backend, setBackend] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/v1/test`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        setBackend(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Could not connect to the Spring Boot backend.");
      });
  }, []);

  return (
    <div className="app">
      <div className="card">
        <h1>Yurpha Games</h1>

        <p className="subtitle">Domain Connection Test</p>

        <div className="status">
          <span
            className={`status-dot ${
              backend ? "connected" : error ? "disconnected" : "loading"
            }`}
          />

          <span>
            {backend
              ? "Backend Connected"
              : error
                ? "Backend Disconnected"
                : "Connecting..."}
          </span>
        </div>

        {backend && (
          <div className="response">
            <p>
              <strong>Message:</strong>
            </p>

            <p>{backend.message}</p>

            <p>
              <strong>Status:</strong>
            </p>

            <p>{backend.status}</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <div className="endpoint">
          <span>API</span>
          <code>localhost:8080/api/v1/test</code>
        </div>
      </div>
    </div>
  );
}

export default App;
