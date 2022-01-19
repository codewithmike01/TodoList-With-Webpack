import './index.css';
// eslint-disable-next-line import/no-cycle
import TodoList from './module/updateStatus.js';
// eslint-disable-next-line import/no-cycle
import { editDescription, clearComoleted, render } from './module/AddRemove.js';

const TodoListObj = new TodoList();
const inputTodo = document.querySelector('.add__list');

export default function Starter() {
  const threeDots = document.querySelectorAll('li');
  threeDots.forEach((dotValue, index) => {
    const dot = dotValue.querySelector('.three__dots');
    if (dot) {
      const newDot = dot.cloneNode(true);
      dotValue.replaceChild(newDot, dot);
      newDot.addEventListener('click', () => {
        editDescription(dotValue, index, TodoListObj);
        Starter();
      });
    }
  });
}

inputTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    TodoListObj.addTodo(inputTodo.value.trim());
    inputTodo.value = '';
    render(TodoListObj.list, TodoListObj);
    Starter();
  }
});

clearComoleted.addEventListener('click', () => {
  const strickers = document.querySelectorAll('.strike');
  strickers.forEach((value) => {
    const parentContainerLi = value.parentNode.parentNode;
    parentContainerLi.style.display = 'none';
    const title = parentContainerLi.querySelector('.tagP').textContent;
    TodoListObj.removeList(title);
  });

  render(TodoListObj.list, TodoListObj);
  Starter();
});

render(TodoListObj.list, TodoListObj);
Starter();
