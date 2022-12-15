import { data } from "browserslist";

export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // получение данных о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  //получение карточек с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  //Редактирование профиля
  userEditinfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then(this._checkResponse);
  }

  //обновление аватара

  setUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    }).then(this._checkResponse);
  }

  addCardRequest(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCardRequest(id) {
    return fetch(`${this.baseUrl}/cards/${id} `, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes `, {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes `, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }
}
