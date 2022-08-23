const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupAdd = document.querySelector(".popup_type_add-card");

const openButton = document.querySelector(".profile__edit");
const openButtonAdd = document.querySelector(".profile__add");
const closeButton = document.querySelector(".popup__close");
const closeButtonAdd = document.querySelector("#popupAddCloseBtn");

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_job");
const profileSubmit = formElement.querySelector("popup__button");

const profileElement = document.querySelector(".profile");
const profileName = profileElement.querySelector(".profile__name");
const profileJob = profileElement.querySelector(".profile__profession");

// Попап открытия формы
// Открыть Popup редактирования формы

function openPopup() {
  popupEdit.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Закрыть Popup редактирования формы

function closePopup() {
  popupEdit.classList.remove("popup_opened");
}

openButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

//сабмит формы редактирования профиля

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileSubmit);
}

formElement.addEventListener("submit", formSubmitHandler);

// Попап добавления карточки формы

function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
}

function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}

openButtonAdd.addEventListener("click", openPopupAdd);
closeButtonAdd.addEventListener("click", closePopupAdd);

//Добавление 6 карточек из коробки

const cardTemplate = document.querySelector(".cards__template");
const listElement = document.querySelector(".element__list");
const inputElementAddName = document.querySelector(".popup__input_place_name");
const inputElementAddLink = document.querySelector(".popup__input_place_link");
const formAddCard = document.querySelector("#popupAddForm");
const formAddPlaceName = formAddCard.querySelector(".popup__input_place_name");
const formAddLink = formAddCard.querySelector(".popup__input_place_link");
const addCardSubmitBtn = document.querySelector("#popupAddSubmitBtn");

function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector(".element__text").textContent = cardName;
  cardElement.querySelector(".element__image").src = cardLink;

  listElement.append(addCard);
}

initialCards.forEach((element) => {
  addCard(element.name, element.link);
});
