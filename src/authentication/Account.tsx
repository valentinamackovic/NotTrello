import { useState } from "react";
import { useHistory } from "react-router-dom";
import { clearLocalStorage, isAuthenticated } from "./authService";

function Account() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  const logout = () => {
    clearLocalStorage();
    setIsMenuOpen(false);
    history.push("/login");
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="text-end text-color">
      <i
        className="bi bi-three-dots-vertical"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <div className="account-menu-options text-dark fs-6 text-center">
          <div>Account</div>
          <hr />
          <div
            className="account-menu-option text-start clickable"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
