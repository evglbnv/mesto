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
const cardTemplate = document.querySelector(".cards__template");
const listElement = document.querySelector(".element__list");
const inputElementAddName = document.querySelector(".popup__input_place_name");
const inputElementAddLink = document.querySelector(".popup__input_place_link");
const formAddCard = document.querySelector("#popupAddForm");
const formAddPlaceName = formAddCard.querySelector(".popup__input_place_name");
const formAddLink = formAddCard.querySelector(".popup__input_place_link");
const addCardSubmitBtn = document.querySelector("#popupAddSubmitBtn");
const popupImage = document.querySelector(".popup_type_show-image");
const cardImage = document.querySelector(".element__image");
const closePopupImageBtn = document.querySelector("#popupShowCloseBtn");
const popupOpenImage = document.querySelector(".popup__image");
const popupOpenImageText = document.querySelector(".popup__figcaption");

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

// Открытие Попапа добавления карточки
function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
}
// Закрытие Попапа добавления карточки
function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}

// Слушатели событий на открытие/закрытие попапа редактирования формы
openButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

// Слушатели событий на открытие/закрытие попапа добавления карточки
openButtonAdd.addEventListener("click", openPopupAdd);
closeButtonAdd.addEventListener("click", closePopupAdd);

//сабмит формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileSubmit);
}
formElement.addEventListener("submit", formSubmitHandler);

// Функция добавления карточек
function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector(".element__text").textContent = cardName;
  cardElement.querySelector(".element__image").src = cardLink;
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", likeHandler);
  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", deleteHandler);
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", () => openImagePopup(cardName, cardLink));
  cardElement.querySelector(".element__image").setAttribute("alt", cardName);
  listElement.prepend(cardElement);
}

//Метод forEach для работы с массивом
initialCards.forEach((element) => {
  addCard(element.name, element.link);
});

// Функция сабмита добавления карточки
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  cardName = formAddPlaceName.value;
  cardLink = formAddLink.value;
  addCard(cardName, cardLink);
  closePopupAdd(addCardSubmitBtn);
}

formAddCard.addEventListener("submit", cardFormSubmitHandler);

// функция добавления like__active
function likeHandler(e) {
  e.target.classList.toggle("element__like_active");
}

//функция удаления карточек
function deleteHandler(e) {
  const itemElement = e.target.closest(".element__card");
  itemElement.remove();
}

// функция добавления класса открытия попапа для карточки
function openPopupImage() {
  popupImage.classList.add("popup_opened");
}

formAddCard.addEventListener("submit", cardFormSubmitHandler);

//функция открытия попапа картинки
function openImagePopup(cardName, cardLink) {
  popupOpenImage.src = cardLink;
  popupOpenImageText.textContent = cardName;
  popupOpenImage.setAttribute("alt", cardName);
  openPopupImage();
}

//функция закрытия попапа картинки

function closeImagePopup() {
  popupImage.classList.remove("popup_opened");
}

closePopupImageBtn.addEventListener("click", closeImagePopup);
