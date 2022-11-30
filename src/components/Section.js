export default class Section {
  constructor({ items, renderer }, containerSelection) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelection);
  }

  //Отрисовка карточек через renderer
  renderAllElements() {
    this._items.forEach((item) => this._renderer(item));
  }

  //Принимает DOM элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
