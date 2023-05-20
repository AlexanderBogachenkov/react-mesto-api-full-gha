import { useState } from "react";

const Login = ({ handleLogin, isLoading, loggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginBtnText = !isLoading ? "Войти" : "Секундочку...";

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    !loggedIn && (
      <div className="login">
        <form name="login" className="login__container" onSubmit={handleSubmit}>
          <h2 className="login__title">Вход</h2>
          <fieldset className="login__fields">
            <input
              className="login__field login__field_type_email"
              id="email-input"
              type="email"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Email"
              required
            />
            <span className="error email-input-error"></span>
            <input
              className="login__field login__field_type_password"
              id="password-input"
              type="password"
              value={password}
              onChange={handleChangePassword}
              placeholder="Пароль"
              minLength="2"
              maxLength="100"
              required
            />
            <span className="error password-input-error"></span>
            <button
              className="login__submit-button"
              type="submit"
              aria-label="Войти"
            >
              {loginBtnText}
            </button>
          </fieldset>
        </form>
      </div>
    )
  );
};

export default Login;
