import logo from "../images/MestoLogo.svg";
import { Route, Routes, Link } from "react-router-dom";
import React from "react";

function Header({ email, handleLogout }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место - Россия" />

      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
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
                to="/sign-in"
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
