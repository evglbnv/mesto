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
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "d9d4d338-c6a2-4158-acba-2ca5c25fc52c",
    "Content-Type": "application/json",
  },
});

const infoPopup = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__profession",
  avatarSelector: ".profile__avatar",
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    infoPopup.setUserInfo(user), cardsList.renderAllElements(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

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
  submitFormHandler: (data) => {
    api
      .addCardRequest(data)
      .then((res) => {
        cardsList.addItem(createCard(res));
      })
      .catch((err) => console.log(err));
  },
});

addPopup.setEventListeners();

const editPopup = new PopupWithForm(".popup_type_edit-profile", {
  submitFormHandler: (data) =>
    api
      .userEditinfo(data)
      .then((res) => {
        infoPopup.setUserInfo(res);
      })
      .catch((err) => console.log(err)),
});

editPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm(".popup_type_avatar-update", {
  submitFormHandler: (data) =>
    api
      .setUserAvatar(data)
      .then((res) => {
        console.log(res);
        infoPopup.setNewAvatar(res);
      })
      .catch((err) => console.log(err)),
});

avatarEditPopup.setEventListeners();
document
  .querySelector(".profile__avatar-overlay")
  .addEventListener("click", () => avatarEditPopup.open());

const imagePopup = new PopupWithImage(".popup_type_show-image");
imagePopup.setEventListeners();

const formEditValidator = new FormValidator(validationConfig, formEditElement);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validationConfig, formAddCard);
formAddValidator.enableValidation();
