import './index.css';

const todoListContianer = document.querySelector('.todo__list');

// const li = document.createElement('li');

const listTodo = [
  { description: 'wash the dishes', completed: false, index: 0 },
  { description: 'Complete To Do list project', completed: false, index: 1 },
  { description: 'Fix Car', completed: false, index: 2 },
];

listTodo.forEach((list) => {
  todoListContianer.innerHTML += `<li>
  <div class="check">
    <input type="checkbox" name="completed" />
    <p>${list.description}</p>
  </div>
  <div class="three__dots">
  </div>
</li>
<hr /> `;
});
