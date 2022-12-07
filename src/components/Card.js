// import { openImagePopup } from "./index.js";
// import { initialCards } from "./cards.js";
// import Section from "../Section.js";

export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card")
      .cloneNode(true);

    return cardElement;
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

    this._setEventListeners();
    return this._element;
  }

  _handleLike() {
    this._cardLike.classList.toggle("element__like_active");
  }

  _handleDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this._handleLike();
    });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDelete();
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }
}