// import { openImagePopup } from "./index.js";
// import { initialCards } from "./cards.js";
// import Section from "../Section.js";

export default class Card {
  constructor(
    { data, userId, handleCardClick, handleDeleteClick, handleLikeClick },
    templateSelector
  ) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likes = data.likes;
    this._data = data;
    this._id = data._id;
    this.userId = userId;
    this._ownerId = data.owner._id;

    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card")
      .cloneNode(true);

    return cardElement;
  }

  _setLikes(value) {
    const likeCountElement = this._element.querySelector(
      ".element__like-counter"
    );

    likeCountElement.textContent = value;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".element__image");
    this._cardLike = this._element.querySelector(".element__like");

    this._element.querySelector(".element__text").textContent = this._cardName;
    this._cardImage.src = this._cardLink;
    this._cardImage.setAttribute("alt", this._cardName);

    this._setLikes();
    this._element.querySelector(".element__like-counter").textContent =
      this._likes.length;

    if (this._ownerId !== this.userId) {
      this._element.querySelector(".element__delete").style.display = "none";
    }

    if (this._likes) {
      this._likes.forEach((user) => {
        if (user._id === this.userId) {
          this._cardLike.classList.add("element__like_active");
        }
      });
    }

    this._setEventListeners();
    return this._element;
  }

  toggleCardLike() {
    this._cardLike.classList.toggle("element__like_active");
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });

    this._cardLike.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
  }
}
