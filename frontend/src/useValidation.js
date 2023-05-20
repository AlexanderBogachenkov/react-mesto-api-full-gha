import { useState } from "react";

export default function useValidation() {
  const [values, setValues] = useState({
    // name: "",
    // email: "",
    // password: "",
  });

  const [error, setError] = useState({
    // name: "",
    // email: "",
    // password: "",
  });

  const [formValid, setFormValid] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    const error = e.target.validationMessage;

    setValues((values) => ({ ...values, [name]: value }));
    setError((errors) => ({ ...errors, [name]: error }));

    const formValid = Object.values(error).every((error) => error === "");
    setFormValid(formValid);
    // console.dir(e.target.validationMessage);
  };

  const resetValidation = (values = {}, error = {}) => {
    setValues(values);
    setError(error);
  };

  return {
    values,
    error,
    onChange,
    resetValidation,
    formValid,
  };
}
