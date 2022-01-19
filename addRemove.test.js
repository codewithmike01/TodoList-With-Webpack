import TodoList from './src/module/updateStatus';

import LocalStorage from './__mocks__/LocalStorage';

global.localStorage = new LocalStorage();
const todolist = new TodoList();

describe('Add and Remove', () => {
  test('Add Element', () => {
    const title = 'Hello';

    todolist.addTodo(title);

    expect(todolist.list[0].description).toBe('Hello');
  });
});

describe('Remove an Element', () => {
  test('To remove ', () => {
    const title = 'Hello';
    todolist.removeList(title);

    expect(todolist.list.length).toBe(0);
  });
});
