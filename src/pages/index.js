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
import PopupDeleteSubmit from "../components/PopupDeleteSubmit.js";
import { formAddCard, popupBtnEditOpen } from "../utils/constants.js";
import { popupBtnAddOpen } from "../utils/constants.js";
import { cardListSelector } from "../utils/constants.js";
import { formEditElement } from "../utils/constants.js";
import { avatarEditElement } from "../utils/constants.js";
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

//получение с сервера данных о пользователе и массива карточек с их дальнейшей отрисовкой

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

const deleteForm = new PopupDeleteSubmit(".popup_type_confirm-delete");

deleteForm.setEventListeners();

//создание карточки и передача коллбэков
function createCard(data) {
  const card = new Card(
    {
      data,
      userId: infoPopup.userId,
      handleCardClick: (data) => {
        console.log(data);
        imagePopup.open(data);
      },
      handleDeleteClick: (id) => {
        deleteForm.open();
        deleteForm.setCard(() => {
          api
            .deleteCardRequest(id)
            .then((res) => {
              card.deleteCard();
              deleteForm.close();
            })
            .catch((err) => console.log(err));
        });
      },
      handleLikeClick: (id) => {
        if (card._cardLike.classList.contains("element__like_active")) {
          api
            .deleteLike(id)
            .then((res) => {
              card.setLikes(res.likes.length);
              card.toggleCardLike();
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addLike(id)
            .then((res) => {
              card.setLikes(res.likes.length);
              card.toggleCardLike();
            })
            .catch((err) => console.log(err));
        }
      },
    },
    ".cards__template"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//попап на создание карточки
const addPopup = new PopupWithForm(".popup_type_add-card", {
  submitFormHandler: (data) => {
    addPopup.setSubmitButtonLoading(true);
    api
      .addCardRequest(data)
      .then((res) => {
        addPopup.close();
        cardsList.addItem(createCard(res));
      })
      .catch((err) => console.log(err))
      .finally(() => addPopup.setSubmitButtonLoading(false));
  },
});

addPopup.setEventListeners();

//попап на изменение профиля
const editPopup = new PopupWithForm(".popup_type_edit-profile", {
  submitFormHandler: (data) => {
    editPopup.setSubmitButtonLoading(true);
    api
      .userEditinfo(data)
      .then((res) => {
        editPopup.close();
        infoPopup.setUserInfo(res);
      })
      .catch((err) => console.log(err))
      .finally(() => editPopup.setSubmitButtonLoading(false));
  },
});

editPopup.setEventListeners();

//попап на редактирование профиля
const avatarEditPopup = new PopupWithForm(".popup_type_avatar-update", {
  submitFormHandler: (data) => {
    avatarEditPopup.setSubmitButtonLoading(true);
    api
      .setUserAvatar(data)
      .then((res) => {
        console.log(res);
        avatarEditPopup.close();
        infoPopup.setNewAvatar(res);
      })
      .catch((err) => console.log(err))
      .finally(() => avatarEditPopup.setSubmitButtonLoading(false));
  },
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
const avatarEditValidator = new FormValidator(
  validationConfig,
  avatarEditElement
);
avatarEditValidator.enableValidation();

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  cardListSelector
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    infoPopup.setUserInfo(user), cardsList.renderAllElements(cards);
  })
  .catch((err) => {
    console.log(err);
  });
