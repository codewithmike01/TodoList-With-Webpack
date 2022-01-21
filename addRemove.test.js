/**
 * @jest-environment jsdom
 */

import TodoList from './src/module/updateStatus.js';
import { editListWrite } from './src/module/AddRemove.js';
import LocalStorage from './__mocks__/LocalStorage.js';

document.body.innerHtml = `<main>
<header>
  <div class="todo__list__header">
    <div class="header__todo">
      <h1>Today's To Do</h1>
      <div class="image__header">
        <img src="./assets/reload.svg" alt="Reload Icon" class="reload" />
      </div>
    </div>
  </div>
  <hr />
  <form action="#">
    <input
      type="text"
      placeholder="Add to your list..."
      class="add__list"
    />
    <div class="enter">
      <img src="./assets/return.svg" alt="return icon" class="return" />
    </div>
  </form>

  <div class="list__container">
    <ul class="todo__list">
      <!-- Dynamicaly Generated -->
    </ul>
  </div>
</header>

<div class="footer">
  <button class="clearMarked h3">Clear all completed</button>
</div>
</main>`;

global.localStorage = new LocalStorage();
const todolist = new TodoList();

describe('Add and Remove', () => {
  test('Add Element', () => {
    const title = 'Hello';

    todolist.addTodo(title);

    const array = todolist.list[0].description;

    expect(array).toBe('Hello');
  });
});

describe('Remove an Element', () => {
  test('To remove ', () => {
    const title = 'Hello';
    todolist.removeList(title);

    const arrayLength = todolist.list.length;

    expect(arrayLength).toBe(0);
  });
});

describe('Editable Dom', () => {
  test('Editable Test', () => {
    const title = 'Task one';
    todolist.addTodo(title);
    const index = 0;
    const textInsterted = 'Task';

    editListWrite(textInsterted, index, todolist);

    const { description } = todolist.list[0];

    expect(description).toBe('Task');
  });
});

describe('Completed Status Update', () => {
  const index = 0;

  test('Status Test default is false', () => {
    const listValue = todolist.list[index];

    const status = listValue.completed;

    expect(status).toBe(false);
  });

  test('Status change to True', () => {
    const title = todolist.list[index].description;
    const marked = true;

    todolist.markList(title, marked);

    const status = todolist.list[index].completed;

    expect(status).toBe(true);
  });
});

describe('Clear All Completed', () => {
  const titleOne = 'Task two';
  const titleTwo = 'Task three';
  const titleFour = 'Task Four';
  test('Clear/Remove All Completed', () => {
    todolist.addTodo(titleOne);
    todolist.addTodo(titleTwo);
    todolist.addTodo(titleFour);

    const { length } = todolist.list;

    expect(length).toBe(4);
  });

  test('Mark some List Item as completed And remove', () => {
    const title = todolist.list[0].description;
    const titleTwo = todolist.list[2].description;
    const marked = true;

    todolist.markList(title, marked);
    todolist.markList(titleTwo, marked);

    const statusOne = todolist.list[0].completed;
    const statusTwo = todolist.list[2].completed;

    expect(statusOne).toBe(true);
    expect(statusTwo).toBe(true);

    todolist.removeList(title);
    todolist.removeList(titleTwo);

    const { length } = todolist.list;

    expect(length).toBe(2);
  });
});
