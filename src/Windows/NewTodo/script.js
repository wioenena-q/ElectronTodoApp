/**
 * @type {HTMLInputElement}
 */
const input = document.querySelector("#fTodo");
const btnSave = document.querySelector("#btnSave");
let todo = "";

input.addEventListener("keyup", (e) => {
  todo = e.target.value;
});

btnSave.addEventListener("click", () => {
  if (todo === "") {
    api.missingInput("send-alert", "Please enter a todo");
    return;
  }

  api.acceptInput("accept-input", todo);

  todo = "";
  input.innerHTML = "";
});
