import './index.css';
import TodoList, { inputTodo } from './module/updateStatus';
import { editDescription, clearComoleted, render } from './module/AddRemove.js';

const TodoListObj = new TodoList();

function Starter() {
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
    TodoListObj.addTodo();
    render(TodoListObj.list, TodoListObj);
    Starter();
  }
});

clearComoleted.addEventListener('click', () => {
  TodoListObj.removeList();
  render(TodoListObj.list, TodoListObj);
  Starter();
});

render(TodoListObj.list, TodoListObj);
Starter();
