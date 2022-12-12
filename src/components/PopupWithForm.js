import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitFormHandler }) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._element = this._popup.querySelector(".popup__form");
    this._submitButton = this._element.querySelector(".popup__button");
    console.log(this._submitButton);
    //достаём все элементы полей
    this._inputList = this._element.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    //создаём пустой объект
    this._formValues = {};
    //добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      console.log(input.value);
    });

    console.log(this._formValues);
    //возвращаем объект значений
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._element.reset();
  }

  setSubmitButtonLoading(isLoading) {
    if (isLoading) {
      this._submitButtonDefaultText = this._submitButton.textContent;
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
      this.close();
    });
  }
}
