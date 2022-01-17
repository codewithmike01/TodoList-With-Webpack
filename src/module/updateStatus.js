import Starter from '../index.js';
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

  editListWrite(pDots, index, e) {
    if (e.key === 'Enter') {
      pDots.contentEditable = false;
      document.querySelector('.color .trash').remove();
      this.divDot = document.createElement('div');
      this.divDot.classList.add('three__dots');
      document.querySelector('.color').appendChild(this.divDot);
      document.querySelector('.color').classList.remove('color');
      const change = pDots.innerText;
      pDots.innerText = change
        .split('')
        .splice(0, change.length - 2)
        .join('');
    }

    this.list[index].description = pDots.innerText;
    localStorage.setItem('todoList', JSON.stringify(this.list));
    Starter();
  }

  reArrange() {
    this.list.forEach((value, index) => {
      value.index = index + 1;
    });
  }
}
