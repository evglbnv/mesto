import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, textElement, imageElement) {
    super(popupSelector);
    this._textElement = textElement;
    this._imageElement = imageElement;
    this._imageLink = this._popupSelector.querySelector(".popup__image");
    this._textText = this._popupSelector.querySelector(".popup__figcaption");
  }

  open(data) {
    super.open();
    this._imageLink.src = data.link;
    console.log(data.link);
    this._textText.textContent = data.name;
    console.log(data.name);
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }
}
