export const inputTodo = document.querySelector('.add__list');

export default class TodoList {
  constructor() {
    this.list = localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : [];
  }

  addTodo() {
    const listLength = this.list.length;
    if (inputTodo.value.trim() !== '') {
      this.list.push({
        description: inputTodo.value,
        completed: false,
        index: listLength,
      });
    }

    this.reArrange();
    localStorage.setItem('todoList', JSON.stringify(this.list));
    inputTodo.value = '';
  }

  markList(content, index, marked) {
    const p = content.parentNode.querySelector('.tagP');
    const title = p.textContent;
    if (marked === true) {
      this.list = this.list.filter((item) => {
        if (item.description === title) {
          item.completed = true;
          return item;
        }
        return item;
      });
      p.classList.add('strike');
    } else {
      this.list = this.list.filter((item) => {
        if (item.description === title) {
          item.completed = false;
          return item;
        }
        return item;
      });
      p.classList.remove('strike');
    }
    const hold = this.list.filter((item) => item);
    this.list = hold;
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  removeList() {
    const strickers = document.querySelectorAll('.strike');
    strickers.forEach((value) => {
      const parentContainerLi = value.parentNode.parentNode;
      parentContainerLi.style.display = 'none';
      const title = parentContainerLi.querySelector('.tagP').textContent;
      this.list = this.list.filter((value) => value.description !== title);
    });

    this.reArrange();
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  // SMALL UTILITIES

  editListWrite(pDots, index) {
    this.list[index].description = pDots.innerText;
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  reArrange() {
    this.list.forEach((value, index) => {
      value.index = index + 1;
    });
  }
}
