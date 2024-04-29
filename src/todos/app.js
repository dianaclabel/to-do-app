import html from "./app.html?raw"; // Nos permite importar un archivo HTML, el HTML se convierte en string.HTML podemos inyectarlo en el JS
import todoStore from "../store/todo.store";
import { renderTodos } from "./use-cases";

const ElementIDs = {
  TodoList: ".todo-list",
};
/**
 *
 * @param { String }elementId
 */

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();
};
