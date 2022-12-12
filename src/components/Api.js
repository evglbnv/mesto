import { data } from "browserslist";

export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // получение данных о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //получение карточек с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        {
          console.log(err);
        }
      });
  }

  //обновление аватара

  setUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        {
          console.log(err);
        }
      });
  }

  addCardRequest(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCardRequest(id) {
    return fetch(`${this.baseUrl}/cards/${id} `, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes `, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes `, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
