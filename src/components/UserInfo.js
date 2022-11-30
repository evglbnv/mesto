export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      job: this._infoSelector.textContent,
    };

    return userInfo;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._infoSelector.textContent = data.job;
  }
}

// //сабмит формы редактирования профиля
// function handleEditFormSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(profileEditPopup);
// }
