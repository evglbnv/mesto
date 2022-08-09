const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.popup__close');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileSubmit = formElement.querySelector('popup__button')

const profileElement = document.querySelector('.profile')
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__profession');


const togglePopup = function () {
    popup.classList.toggle('popup__opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}


formElement.addEventListener('submit', formSubmitHandler);
openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
