class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    // this._credentials = options.credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}, что-то не так...`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}${"/cards"}`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // другие методы работы с API

  getUserData() {
    return fetch(`${this._baseUrl}${"/users/me"}`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeUserData({ name, about }) {
    return fetch(`${this._baseUrl}${"/users/me"}`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}${"/cards"}`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${"/cards/"}${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addLikeToCard(cardId) {
    // console.log('cardId -> ', cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLikeFromCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeAvatar({ avatar }) {
    return fetch(`${this._baseUrl}${"/users/me/avatar"}`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59/",
  baseUrl: "https://alexboga.projectback.nomoredomains.monster",
  // baseUrl: "http://127.0.0.1:3000", // тестируем локально
  headers: {
    //old authorization: "8b85f1f7-8fcc-4b0e-a737-149d0d1061a5",
    // "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  credentials: "include",
});
