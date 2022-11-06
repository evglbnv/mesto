export default class Card {
  constructor(cardName, cardLink, templateSelector) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".cards__template")
      .content.querySelector(".element__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    this._element.querySelector(".element__text").textContent = this._cardName;
    this._element.querySelector(".element__image").src = this._cardLink;
    this._element
      .querySelector(".element__image")
      .setAttribute("alt", this._cardName);

    this._setEventListeners();
    return this._element;
  }

  _handleLike() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _handleDelete() {
    this._element.remove();
  }

  _handleOpenImagePopup() {
    document.querySelector(".popup__image").src = this._cardLink;
    document.querySelector(".popup__figcaption").textContent = this._cardName;
    document
      .querySelector(".popup_type_show-image")
      .classList.add("popup_opened");
  }

  _handleCloseImagePopup() {
    document.querySelector(".popup__image").src = "";
    document
      .querySelector(".popup_type_show-image")
      .classList.remove("popup_opened");
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLike();
      });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDelete();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenImagePopup();
      });

    document
      .getElementById("popupShowCloseBtn")
      .addEventListener("click", () => {
        this._handleCloseImagePopup();
      });
  }
}
