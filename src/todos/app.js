// Esto solo funciona vite https://vitejs.dev/guide/assets.html#importing-asset-as-string
import html from "./app.html?raw"; // Nos permite importar un archivo HTML, el HTML se convierte en string.HTML podemos inyectarlo en el JS
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos } from "./use-cases";

const ElementIDs = {
  ClearCompletedButton: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
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

  //Referencias HTML

  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUl = document.querySelector(ElementIDs.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementIDs.ClearCompletedButton
  );
  const filtersList = document.querySelectorAll(ElementIDs.TodoFilters);

  //Listeners
  newDescriptionInput.addEventListener("keyup", (event) => {
    console.log(event);
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });

  todoListUl.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUl.addEventListener("click", (event) => {
    const isDestroyElement = event.target.className === "destroy";
    const element = event.target.closest("[data-id]");
    if (!element || !isDestroyElement) return;
    todoStore.deleteTodo(element.getAttribute("data-id"));

    displayTodos();
  });

  clearCompletedButton.addEventListener("click", () => {
    console.log("hola");
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersList.forEach((element) => {
    element.addEventListener("click", (element) => {
      filtersList.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");

      console.log(element.target.text);

      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });
};
