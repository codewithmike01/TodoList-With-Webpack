import TodoList from './src/module/updateStatus.js';

import LocalStorage from './__mocks__/LocalStorage.js';

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
