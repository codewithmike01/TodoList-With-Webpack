// eslint-disable-next-line import/no-cycle
import TodoList from './updateStatus.js';
// eslint-disable-next-line import/no-cycle
import { editDescription } from './AddRemove.js';

const TodoListObj = new TodoList();

export default function Starter() {
  const threeDots = document.querySelectorAll('li');
  threeDots.forEach((dotValue, index) => {
    const dot = dotValue.querySelector('.three__dots');
    if (dot) {
      const newDot = dot.cloneNode(true);
      dotValue.replaceChild(newDot, dot);
      newDot.addEventListener('click', () => {
        editDescription(dotValue, index, TodoListObj);
      });
    }
  });
}
