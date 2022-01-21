export default class TodoList {
  constructor() {
    this.list = localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : [];
  }

  addTodo(inputTodo) {
    const listLength = this.list.length;
    if (inputTodo !== '') {
      this.list.push({
        description: inputTodo,
        completed: false,
        index: listLength,
      });
    }

    this.reArrange();
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  markList(content, marked) {
    if (marked === true) {
      this.list = this.list.filter((item) => {
        if (item.description === content) {
          item.completed = true;
          return item;
        }
        return item;
      });
    } else {
      this.list = this.list.filter((item) => {
        if (item.description === content) {
          item.completed = false;
          return item;
        }
        return item;
      });
    }
    const hold = this.list.filter((item) => item);
    this.list = hold;
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  removeList(title) {
    this.list = this.list.filter((value) => value.description !== title);
    this.reArrange();
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  // SMALL UTILITIES Needed

  reArrange() {
    this.list.forEach((value, index) => {
      value.index = index + 1;
    });
  }
}
