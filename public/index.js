const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const summary = document.getElementById("summary");

let localStorageService;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!input.value) {
    return;
  }

  const task = input.value;
  input.value = "";

  localStorageService.addTask(task);

  updateTaskList();
  updateSummary();
});

document.addEventListener("DOMContentLoaded", () => {
  localStorageService = new LocalStorageService();
  updateTaskList();
  updateSummary();
});
