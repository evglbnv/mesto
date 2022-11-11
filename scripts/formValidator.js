const validationConfig = {
  // formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "error_visible",
};

class FormValidator {
  constructor(data, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = data.inputSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formSelector.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  //функция скрытия ошибки
  _hideInputError = (inputElement) => {
    const errorElement = this._formSelector.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  //проверка введённых данных на валидность для всех форм и полей
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //Функция принимает на вход массив полей. Если все поля активны - активировать кнопку.
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // функция проверки кнопки сабмита на валидность
  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this._enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  };

  _enableSubmitButton = () => {
    document
      .querySelector(this._submitButtonSelector)
      .classList.add(this._inactiveButtonClass);
    document.querySelector(this._submitButtonSelector).disabled = true;
  };

  disableSubmitButton = () => {
    document
      .querySelector(this._submitButtonSelector)
      .classList.remove(this._inactiveButtonClass);
    document.querySelector(this._submitButtonSelector).disabled = false;
  };

  // Добавление обработчиков всем полям формы
  _setEventListeners = () => {
    const inputList = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  };

  // функция Disable кнопки сабмита формы при открытии формы добавления карточки

  // enableValidation = () => {
  //   const formList = Array.from(document.querySelectorAll(this._formSelector));
  //   formList.forEach((formElement) => {
  //     formElement.addEventListener("submit", (evt) => {
  //       evt.preventDefault();
  //     });
  //     this._setEventListeners(formElement);
  //   });

  enableValidation = () => {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formSelector);
  };
}

export { validationConfig, FormValidator };
