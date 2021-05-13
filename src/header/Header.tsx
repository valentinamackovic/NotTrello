import React from "react";
import { Link, useLocation } from "react-router-dom";
import Account from "../authentication/Account";

function Header() {
  const { pathname } = useLocation();
  return (
    <nav className="navbar navbar-dark bg-dark d-flex justify-content-center text-info fs-4 row m-0">
      {pathname !== "/" ? (
        <Link to="/" className="col-4">
          <i className="bi bi-arrow-left-circle header-link" />
        </Link>
      ) : (
        <span className="col-4" />
      )}
      <Link to="/" className="col-4 text-center header-link">
        Not Trello
      </Link>
      <span className="col-4">
        <Account />
      </span>
    </nav>
  );
}

export default Header;
