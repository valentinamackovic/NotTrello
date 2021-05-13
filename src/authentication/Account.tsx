import { useState } from "react";
import { isAuthenticated } from "./authService";

function Account() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="text-light text-end">
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
            onClick={() => console.log("clicked")}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
