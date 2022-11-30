"use strict";

import Card from "./components/Card.js";
import { initialCards } from "./utils/constants.js";
import Section from "./components/Section.js";
import { validationConfig, FormValidator } from "./components/FormValidator.js";
import Popup from "./components/Popup.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import { formAddCard, popupBtnEditOpen } from "./utils/constants.js";
import { popupBtnAddOpen } from "./utils/constants.js";
import { cardListSelector } from "./utils/constants.js";
import { formEditElement } from "./utils/constants.js";
import { profileName } from "./utils/constants.js";
import { profileJob } from "./utils/constants.js";
import { nameInput } from "./utils/constants.js";
import { jobInput } from "./utils/constants.js";
import "./styles/index.css";

// // Добавление value в форму редактирования
function setEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const infoPopup = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__profession",
});

// // Слушатели событий на открытие попапа редактирования формы
popupBtnEditOpen.addEventListener("click", () => {
  editPopup.open();
  infoPopup.getUserInfo();
  console.log(infoPopup.getUserInfo());
  setEditProfile();
});

// //слушатель открытия формы добавления карточки
popupBtnAddOpen.addEventListener("click", () => {
  addPopup.open();
  formAddValidator.disableSubmitButton();
});

const addPopup = new PopupWithForm(".popup_type_add-card", {
  submitFormHandler: (formData) => {
    const card = new Card(
      {
        data: formData,
        handleCardClick: (data) => {
          imagePopup.open(data);
        },
      },
      ".cards__template"
    );
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
});
addPopup.setEventListeners();

const editPopup = new PopupWithForm(".popup_type_edit-profile", {
  submitFormHandler: (data) => infoPopup.setUserInfo(data),
});
console.log(editPopup);
editPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_type_show-image");
imagePopup.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (data) => {
            imagePopup.open(data);
          },
        },
        ".cards__template"
      );
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

cardsList.renderAllElements();

const formEditValidator = new FormValidator(validationConfig, formEditElement);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validationConfig, formAddCard);
formAddValidator.enableValidation();
