"use strict";

import Card from "./card.js";
import { initialCards } from "./cards.js";
import { validationConfig, FormValidator } from "./formValidator.js";

const popup = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector(".popup_type_edit-profile");
const cardAddPopup = document.querySelector(".popup_type_add-card");
const popupShowImage = document.querySelector(".popup_type_show-image");
const closePopupButtons = document.querySelectorAll(".popup__close");
const popupBtnEditOpen = document.querySelector(".profile__edit");
const popupBtnAddOpen = document.querySelector(".profile__add");

const formEditElement = document.querySelector("#popupEditForm");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileSubmit = document.querySelector("popup__button");
const profileElement = document.querySelector(".profile");
const profileName = profileElement.querySelector(".profile__name");
const profileJob = profileElement.querySelector(".profile__profession");
const cardTemplate = document.querySelector(".cards__template");
const listElement = document.querySelector(".element__list");
const inputElementAddName = document.querySelector(".popup__input_place_name");
const inputElementAddLink = document.querySelector(".popup__input_place_link");
const formAddCard = document.querySelector("#popupAddForm");
const formAddPlaceName = formAddCard.querySelector(".popup__input_place_name");
const formAddLink = formAddCard.querySelector(".popup__input_place_link");
const cardImage = document.querySelector(".element__image");
const popupOpenImage = document.querySelector(".popup__image");
const popupOpenImageText = document.querySelector(".popup__figcaption");

// Универсальная функция закрытия popup
closePopupButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function closeCardOnOverlay(evt) {
  const popupToOverlayClose = document.querySelector(".popup_opened");
  if (evt.target === popupToOverlayClose) {
    closePopup(popupToOverlayClose);
  }
}

function pressEscButton(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// Универсальная функция открытия Popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closeCardOnOverlay);
  document.addEventListener("keydown", pressEscButton);
}

// // Универсальная функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", pressEscButton);
}

// // Добавление value в форму редактирования
function setEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// // Слушатели событий на открытие попапа редактирования формы
popupBtnEditOpen.addEventListener("click", () => {
  setEditProfile();
  openPopup(profileEditPopup);
});

// //сабмит формы редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

formEditElement.addEventListener("submit", handleEditFormSubmit);

// //слушатель открытия формы добавления карточки
popupBtnAddOpen.addEventListener("click", () => {
  openPopup(cardAddPopup);
  disableButton(cardAddPopup, validationConfig);
});

initialCards.forEach((initialCard) => {
  //создание экземпляра карточки
  const card = new Card(initialCard.name, initialCard.link);
  //создание карточки и возвращение наружу
  const cardElement = card.generateCard();
  //добавление в DOM
  listElement.prepend(cardElement);
});

// Функция сабмита добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameHeading = formAddPlaceName.value;
  const cardLinkPhoto = formAddLink.value;
  const addCard = new Card(cardNameHeading, cardLinkPhoto);
  const cardElement = addCard.generateCard();
  listElement.prepend(cardElement);
  formAddCard.reset();
  closePopup(cardAddPopup);
}

function disableButton(popup) {
  const button = popup.querySelector(validationConfig.submitButtonSelector);
  button.disabled = true;
  button.classList.add(validationConfig.inactiveButtonClass);
}

// // слушатель сабмита формы добавления карточки
formAddCard.addEventListener("submit", handleCardFormSubmit);

const formEditValidator = new FormValidator(validationConfig, profileEditPopup);
const formAddValidator = new FormValidator(validationConfig, cardAddPopup);

formEditValidator.enableValidation();
formAddValidator.enableValidation();
