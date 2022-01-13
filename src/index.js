import './index.css';
import TodoList, {
  render,
  inputTodo,
  editDescription,
} from './module/AddRemove.js';
import './module/editableContent';

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

// Create

render(TodoListObj.list, TodoListObj);
Starter();
