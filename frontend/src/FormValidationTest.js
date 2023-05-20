// import { useState } from "react";
import useValidation from "./useValidation";

const Form = () => {
  const { values, error, onChange, resetValidation, formValid } =
    useValidation();

  const onSubmit = (e) => {
    e.preventDefault();
    resetValidation();
  };

  console.log(formValid);

  return (
    <div>
      <h3>Форма с валидацией</h3>
      <form name="register" noValidate>
        <p>
          <label>
            <p>Имя</p>
            <input
              name="name"
              onChange={onChange}
              value={values.name || ""}
              type="text"
              required
              minLength="2"
            />
            <p>
              <span style={{ color: "red", fontSize: "10px" }}>
                {error.name || ""}
              </span>
            </p>
          </label>
        </p>
        <p>
          <label>
            <p> Почта</p>
            <input
              name="email"
              onChange={onChange}
              value={values.email || ""}
              type="email"
              required
            />
            <p>
              <span style={{ color: "red", fontSize: "10px" }}>
                {error.email || ""}
              </span>
            </p>
          </label>
        </p>
        <p>
          <label>
            <p>Пароль</p>
            <input
              name="password"
              onChange={onChange}
              value={values.password || ""}
              type="password"
              required
              minLength="8"
            />
            <p>
              <span style={{ color: "red", fontSize: "10px" }}>
                {error.password || ""}
              </span>
            </p>
          </label>
        </p>
        <p>
          <button onClick={onSubmit}>Подтвердить</button>
        </p>
      </form>
    </div>
  );
};

export default Form;
