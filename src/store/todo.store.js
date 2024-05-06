import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "all",
  Completed: "Completed",
  Pending: "pending",
};

const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del tiempo"),
    new Todo("Piedra de realidad"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log("InitStore 🥑");
};

const loadStore = () => {
  // throw new Error("Not implemented");
  if (!localStorage.getItem("state")) return;

  //JSON.stringify nos permite convertir un string a un objeto
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );

  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  // console.log(JSON.stringify(state));
  //JSON.stringify nos permite convertir un obejto en un string
  localStorage.setItem("state", JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`Option ${filter} is not valid`);
  }
};

/**
 *
 * @param {String} description
 */

const addTodo = (description) => {
  if (!description) throw new Error("Not implemented");
  state.todos.push(new Todo(description));

  saveStateToLocalStorage();
};

/**
 *
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }

    return todo;
  });
  saveStateToLocalStorage();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id != todoId);
  saveStateToLocalStorage();
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveStateToLocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */

const setFilter = (newFilter = Filters.All) => {
  // if (Object.keys(Filters).includes(newFilter))
  state.filter = newFilter;
  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
