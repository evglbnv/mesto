export const profileEditPopup = document.querySelector(
  ".popup_type_edit-profile"
);
export const cardAddPopup = document.querySelector(".popup_type_add-card");
export const popupShowImage = document.querySelector(".popup_type_show-image");
export const buttonsСlosePopup = document.querySelectorAll(".popup__close");
export const popupBtnEditOpen = document.querySelector(".profile__edit");
export const popupBtnAddOpen = document.querySelector(".profile__add");
export const formEditElement = document.querySelector("#popupEditForm");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_job");
export const profileElement = document.querySelector(".profile");
export const profileName = profileElement.querySelector(".profile__name");
export const profileJob = profileElement.querySelector(".profile__profession");
export const listElement = document.querySelector(".element__list");
export const formAddCard = document.querySelector("#popupAddForm");
export const formAddPlaceName = formAddCard.querySelector(
  ".popup__input_place_name"
);
export const formAddLink = formAddCard.querySelector(
  ".popup__input_place_link"
);
export const popupOpenImage = document.querySelector(".popup__image");
export const popupOpenImageText = document.querySelector(".popup__figcaption");
export const cardListSelector = ".element__list";

export const initialCards = [
  {
    name: "Ленинск",
    link: "https://a.d-cd.net/2b5d5du-960.jpg",
  },
  {
    name: "Москва",
    link: "https://1prime.ru/images/83288/34/832883481.jpg",
  },
  {
    name: "Киров",
    link: "https://aif-s3.aif.ru/images/016/604/e907d257623cb1d4e6548c259d69e547.jpg",
  },
  {
    name: "Берлин",
    link: "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/e88be674-6672-4e47-b6ff-df940ff7f057/",
  },
  {
    name: "Сидней",
    link: "https://sites.google.com/site/agstralia/_/rsrc/1399464419414/goroda-avstralii/sidnej/Australia_Day.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
