import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, textElement, imageElement) {
    super(popupSelector);
    this._textElement = textElement;
    this._imageElement = imageElement;
    this._imageLink = this._popup.querySelector(".popup__image");
    this._textText = this._popup.querySelector(".popup__figcaption");
  }

  open(data) {
    super.open();
    this._imageLink.src = data.link;
    this._textText.textContent = data.name;
    this._imageLink.alt = data.name;
  }
}
