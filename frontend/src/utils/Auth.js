const BASE_URL = "https://alexboga.projectback.nomoredomains.monster";
// const BASE_URL = "http://127.0.0.1:3000"; // тестируем локально

const _checkResponse = (res) => {
  
  return res.ok ? res.json() : (Promise.reject(`Ошибка ${res.status}, что-то не так...`));
};

export const register = (email, password) => {
  // console.log(email);
  // console.log(password);
  // console.log(BASE_URL);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then(_checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_checkResponse);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    // credentials: "include",
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

    },
  }).then(_checkResponse);
};
