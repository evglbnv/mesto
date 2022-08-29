const popups = document.querySelector(".popup");
const profileEditPopup = document.querySelector(".popup_type_edit-profile");
const cardAddPopup = document.querySelector(".popup_type_add-card");
const popupShowImage = document.querySelector(".popup_type_show-image");
const closePopupButtons = document.querySelectorAll(".popup__close");

const popupBtnEditOpen = document.querySelector(".profile__edit");

const popupBtnAddOpen = document.querySelector(".profile__add");

const formEditElement = document.querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(".popup__input_type_job");
const profileSubmit = formEditElement.querySelector("popup__button");

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
const closePopupImageBtn = document.querySelector("#popupShowCloseBtn");
const popupOpenImage = document.querySelector(".popup__image");
const popupOpenImageText = document.querySelector(".popup__figcaption");

// Универсальная функция закрытия popup
closePopupButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Универсальная функция открытия Popup
function openPopup(popups) {
  popups.classList.add("popup_opened");
}

// Универсальная функция закрытия Popup
function closePopup(popups) {
  popups.classList.remove("popup_opened");
}

function setEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Слушатели событий на открытие попапа редактирования формы
popupBtnEditOpen.addEventListener("click", () => {
  setEditProfile();
  openPopup(profileEditPopup);
});

//сабмит формы редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);
}
formEditElement.addEventListener("submit", handleEditFormSubmit);

popupBtnAddOpen.addEventListener("click", () => openPopup(cardAddPopup));

// Функция добавления карточек
function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector(".element__text").textContent = cardName;
  cardElement.querySelector(".element__image").src = cardLink;
  cardElement.querySelector(".element__image").setAttribute("alt", cardName);
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", handleLike);
  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", handleDelete);
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", () => openImagePopup(cardName, cardLink));
  return cardElement;
}

//Метод forEach для работы с массивом и функция prepend
initialCards.forEach((element) => {
  const initialCard = addCard(element.name, element.link);
  listElement.prepend(initialCard);
});

// Функция сабмита добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNameHeading = formAddPlaceName.value;
  const cardLinkPhoto = formAddLink.value;
  addCard(cardNameHeading, cardLinkPhoto);
  listElement.prepend(addCard(cardNameHeading, cardLinkPhoto));
  formAddPlaceName.value = "";
  formAddLink.value = "";
  closePopup(cardAddPopup);
}

formAddCard.addEventListener("submit", handleCardFormSubmit);

// функция добавления like__active
function handleLike(e) {
  e.target.classList.toggle("element__like_active");
}

//функция удаления карточек
function handleDelete(e) {
  const itemElement = e.target.closest(".element__card");
  itemElement.remove();
}

//функция открытия попапа картинки
function openImagePopup(cardName, cardLink) {
  popupOpenImage.src = cardLink;
  popupOpenImageText.textContent = cardName;
  popupOpenImage.setAttribute("alt", cardName);
  openPopup(popupShowImage);
}
