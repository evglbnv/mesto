import Popup from "./Popup.js";

export default class PopupDeleteSubmit extends Popup {
  constructor(popupSelector, submitFormDelete) {
    super(popupSelector);
    this.submitFormDelete = submitFormDelete;
    this._element = this._popup.querySelector(".popup__form");
  }

  setCard(newSubmitFormDelete) {
    this.submitFormDelete = newSubmitFormDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.submitFormDelete();
    });
  }
}
