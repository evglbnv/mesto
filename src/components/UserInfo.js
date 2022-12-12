export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      job: this._infoSelector.textContent,
    };

    return userInfo;
  }

  setNewAvatar(data) {
    this._avatarSelector.src = data.avatar;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._infoSelector.textContent = data.about;
    this.setNewAvatar(data);
    this.userId = data._id;
  }
}
