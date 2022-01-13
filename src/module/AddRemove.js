const todoListContianer = document.querySelector('.todo__list');
const listConatiner = document.querySelector('.list__container');
const singleList = document.createElement('li');
export const clearComoleted = document.querySelector('.clearMarked');
export const inputTodo = document.querySelector('.add__list');

export default class TodoList {
  constructor() {
    this.list = localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : [];
  }

  addTodo() {
    const listLength = this.list.length;
    if (inputTodo.value !== '') {
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
    if (marked === true) {
      this.list[index].completed = true;
      const p = content.parentNode.querySelector('.tagP');
      p.classList.add('strike');
    } else {
      this.list[index].completed = false;
      const p = content.parentNode.querySelector('.tagP');
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

export function render(member) {
  todoListContianer.innerHTML = '';
  member.forEach((list) => {
    const check = list.completed ? 'checked' : null;
    singleList.innerHTML = `
    <div class="check">
      <input type="checkbox" name="completed" value="${list.index}" ${check}  class="chBox"/>
      <p class="tagP">${list.description}</p>
    </div>
    <div class="three__dots">
    </div>`;
    todoListContianer.appendChild(singleList.cloneNode(true));
    if (check === 'checked') {
      const box = todoListContianer.querySelectorAll('.chBox');
      box.forEach((value) => {
        if (value.checked) {
          value.nextElementSibling.classList.add('strike');
        }
      });
    }
    listConatiner.appendChild(todoListContianer);
  });

  // EventListner for CheckBox
}

export function editDescription(dotValue, index, TodoListObj) {
  const imageTrash = todoListContianer.querySelectorAll('li');
  const parentImage = imageTrash[index];
  if (document.querySelector('.color')) {
    document.querySelector('.color .trash').remove();
    const divDot = document.createElement('div');
    divDot.classList.add('three__dots');
    document.querySelector('.color').appendChild(divDot);
    document.querySelector('.color').classList.remove('color');
  }

  const divTrash = document.createElement('div');
  divTrash.classList.add('trash');
  parentImage.appendChild(divTrash);
  parentImage.classList.add('color');
  imageTrash[index].querySelector('.three__dots').remove();
  divTrash.addEventListener('click', () => {
    const content = parentImage.querySelector('.tagP');
    content.classList.add('strike');
    TodoListObj.removeList();
  });

  const pDots = divTrash.parentNode.querySelector('.tagP');
  pDots.contentEditable = true;
  pDots.addEventListener('keyup', () => {
    TodoListObj.editListWrite(pDots, index);
  });
}
