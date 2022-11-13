"use strict";

import Card from "./card.js";
import { initialCards } from "./cards.js";
import { validationConfig, FormValidator } from "./formValidator.js";

const profileEditPopup = document.querySelector(".popup_type_edit-profile");
const cardAddPopup = document.querySelector(".popup_type_add-card");
const popupShowImage = document.querySelector(".popup_type_show-image");
const buttonsСlosePopup = document.querySelectorAll(".popup__close");
const popupBtnEditOpen = document.querySelector(".profile__edit");
const popupBtnAddOpen = document.querySelector(".profile__add");
const formEditElement = document.querySelector("#popupEditForm");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileElement = document.querySelector(".profile");
const profileName = profileElement.querySelector(".profile__name");
const profileJob = profileElement.querySelector(".profile__profession");
const listElement = document.querySelector(".element__list");
const formAddCard = document.querySelector("#popupAddForm");
const formAddPlaceName = formAddCard.querySelector(".popup__input_place_name");
const formAddLink = formAddCard.querySelector(".popup__input_place_link");
const popupOpenImage = document.querySelector(".popup__image");
const popupOpenImageText = document.querySelector(".popup__figcaption");

// Универсальная установка слушателей на кнопки закрытия.
buttonsСlosePopup.forEach((button) => {
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
  popup.removeEventListener("click", closeCardOnOverlay);
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
  formAddValidator.disableSubmitButton();
});

export function openImagePopup(cardName, cardLink) {
  popupOpenImage.src = cardLink;
  popupOpenImageText.textContent = cardName;
  popupOpenImage.setAttribute("alt", cardName);
  openPopup(popupShowImage);
}

initialCards.forEach((initialCard) => {
  createClassCard(initialCard.name, initialCard.link);
});

function createClassCard(name, link) {
  //создание экземпляра карточки
  const card = new Card(name, link);
  //создание карточки и возвращение наружу
  const cardElement = card.generateCard();
  //добавление в DOM
  listElement.prepend(cardElement);
}

// Функция сабмита добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameHeading = formAddPlaceName.value;
  const cardLinkPhoto = formAddLink.value;
  createClassCard(cardNameHeading, cardLinkPhoto);
  formAddCard.reset();
  closePopup(cardAddPopup);
}

// // слушатель сабмита формы добавления карточки
formAddCard.addEventListener("submit", handleCardFormSubmit);

const formEditValidator = new FormValidator(validationConfig, formEditElement);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validationConfig, formAddCard);
formAddValidator.enableValidation();
