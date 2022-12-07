export default class Section {
  constructor({ renderer }, containerSelection) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelection);
  }

  //Отрисовка карточек через renderer
  renderAllElements(cards) {
    cards.forEach((item) => this._renderer(item));
  }

  //Принимает DOM элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
