import logo from "../images/MestoLogo.svg";
import { Route, Routes, Link } from "react-router-dom";
import React from "react";

function Header({ email, handleLogout }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место - Россия" />

      <Routes>
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__menu">
              <p className="header__email">{email}</p>
              <Link
                to="/signin"
                className="header__link header__link_faded"
                onClick={handleLogout}
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
