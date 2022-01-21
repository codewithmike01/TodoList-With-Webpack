// eslint-disable-next-line import/no-cycle
import Starter from './starter.js';

const todoListContianer = document.querySelector('.todo__list');
const listConatiner = document.querySelector('.list__container');
const singleList = document.createElement('li');
export const clearComoleted = document.querySelector('.clearMarked');

export function render(member, TodoListObj) {
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
  const checkBox = document.querySelectorAll('.chBox');
  let marked = false;
  checkBox.forEach((content) => {
    const p = content.parentNode.querySelector('.tagP');
    const title = p.innerText;
    content.addEventListener('change', () => {
      if (content.checked) {
        p.classList.add('strike');
        marked = true;
        TodoListObj.markList(title, marked);
      } else {
        p.classList.remove('strike');
        marked = false;
        TodoListObj.markList(title, marked);
      }
    });
  });
}

export function editListWrite(textInserted, index, TodoListObj) {
  TodoListObj.list[index].description = textInserted;
  localStorage.setItem('todoList', JSON.stringify(TodoListObj.list));
  Starter();
}

export function editDescription(dotValue, index, TodoListObj) {
  const imageTrash = todoListContianer.querySelectorAll('li');
  const parentImage = imageTrash[index];

  const divTrash = document.createElement('div');
  divTrash.classList.add('trash');
  const divDot = document.createElement('div');
  divDot.classList.add('three__dots');

  if (document.querySelector('.color')) {
    document.querySelector('.color').appendChild(divDot);
    document.querySelector('.color .trash').remove();
    document.querySelector('.color').classList.remove('color');
  }

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
  pDots.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      pDots.contentEditable = false;
      document.querySelector('.color .trash').remove();
      const divDot = document.createElement('div');
      divDot.classList.add('three__dots');
      document.querySelector('.color').appendChild(divDot);
      document.querySelector('.color').classList.remove('color');
      pDots.innerText = pDots.innerText.replace(/\r?\n|\r/g, '');
      const text = pDots.innerHTML;
      editListWrite(text, index, TodoListObj);
    }
  });
}
