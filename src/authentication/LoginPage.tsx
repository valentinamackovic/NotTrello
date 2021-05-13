import { useState } from "react";
import { useHistory } from "react-router-dom";
import { authenticate } from "./authService";

function LoginPage() {
  const [key, setKey] = useState("");
  const [token, setToken] = useState("");
  const history = useHistory();

  const login = () => {
    authenticate(key, token);
    history.push("/");
  };

  return (
    <div className="login-page">
      <form className="w-25 mx-auto mt-5 pt-5 text-dark">
        <div className="mb-3">
          <label className="form-label">Key</label>
          <input
            type="text"
            className="form-control"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Token</label>
          <input
            type="text"
            className="form-control"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button className="btn btn-info text-light w-100 mt-3" onClick={login}>
          Continue
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
