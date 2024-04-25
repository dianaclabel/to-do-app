import html from "./app.html?raw"; // Nos permite importar un archivo HTML, el HTML se convierte en string.
// HTML podemos inyectarlo en el JS

/**
 *
 * @param { String }elementId
 */

export const App = (elementId) => {
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
  })();
};
