"use strict";

import Card from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";
import {
  validationConfig,
  FormValidator,
} from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { formAddCard, popupBtnEditOpen } from "../utils/constants.js";
import { popupBtnAddOpen } from "../utils/constants.js";
import { cardListSelector } from "../utils/constants.js";
import { formEditElement } from "../utils/constants.js";
import "./index.css";

const infoPopup = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__profession",
});

// // Слушатели событий на открытие попапа редактирования формы
popupBtnEditOpen.addEventListener("click", () => {
  editPopup.open();
  const userData = infoPopup.getUserInfo();
  editPopup.setInputValues(userData);
});

// //слушатель открытия формы добавления карточки
popupBtnAddOpen.addEventListener("click", () => {
  addPopup.open();
  formAddValidator.disableSubmitButton();
});

function createCard(data) {
  const card = new Card(
    {
      data,
      handleCardClick: (data) => {
        imagePopup.open(data);
      },
    },
    ".cards__template"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const addPopup = new PopupWithForm(".popup_type_add-card", {
  submitFormHandler: (formData) => {
    const cardElement = createCard(formData);
    cardsList.addItem(cardElement);
  },
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

addPopup.setEventListeners();

const editPopup = new PopupWithForm(".popup_type_edit-profile", {
  submitFormHandler: (data) => infoPopup.setUserInfo(data),
});
console.log(editPopup);
editPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_type_show-image");
imagePopup.setEventListeners();

cardsList.renderAllElements();

const formEditValidator = new FormValidator(validationConfig, formEditElement);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validationConfig, formAddCard);
formAddValidator.enableValidation();
