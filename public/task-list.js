function createEditButton(task, parent) {
  const editButton = document.createElement("button");
  editButton.textContent = strings.taskList.editButton;
  editButton.classList.add("edit");
  editButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const newName = prompt(strings.editPrompt, task.name);
    if (newName) {
      localStorageService.editTaskName(task.id, newName);
      p.textContent = newName;
      updateSummary();
    }
  });

  parent.appendChild(editButton);
}

function createToggle(task, parent, li) {
  const label = document.createElement("label");
  label.classList.add("switch");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  const spam = document.createElement("spam");
  spam.classList.add("slider");
  spam.classList.add("round");

  input.checked = !!task.deletedAt;

  label.appendChild(input);
  label.appendChild(spam);

  label.addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.target.tagName === "SPAM") {
      if (task.deletedAt) {
        localStorageService.restoreTask(task.id);
        li.classList.remove("deleted");
      } else {
        localStorageService.removeTask(task.id);
        li.classList.add("deleted");
      }
      updateSummary();
    }
  });

  parent.appendChild(label);
}

function createCheckbox(task, parent, li) {
  const wrapper = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", `task-checkbox-${task.id}`);
  label.setAttribute("for", `task-checkbox-${task.id}`);

  checkbox.classList.add("task-checkbox");
  checkbox.checked = isBetweenToday(task.completedAt);

  wrapper.addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.target.tagName === "INPUT") {
      if (isBetweenToday(task.completedAt)) {
        localStorageService.uncompleteTask(task.id);
        checkbox.classList.remove("checked");
        li.classList.remove("completed");
      } else {
        console.log("here!!");
        checkbox.classList.add("checked");
        localStorageService.completeTask(task.id);
        li.classList.add("completed");
      }
      console.log(localStorageService.getTasks());
      updateSummary();
    }
  });

  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);
  parent.appendChild(wrapper);
}

function addTaskToList(task) {
  const li = document.createElement("li");
  const buttonWrapper = document.createElement("div");
  const textWrapper = document.createElement("div");

  if (task.deletedAt) {
    li.classList.add("deleted");
  } else if (task.completedAt.length > 0) {
    const completedToday = task.completedAt.some(isBetweenToday);

    if (completedToday) {
      li.classList.add("completed");
    }
  }

  createCheckbox(task, textWrapper, li);
  const p = document.createElement("p");
  p.textContent = task.name;
  p.setAttribute("id", "task-name");
  li.setAttribute("id", task.id);
  textWrapper.appendChild(p);
  li.appendChild(textWrapper);

  createEditButton(task, buttonWrapper);
  createToggle(task, buttonWrapper, li);

  li.appendChild(buttonWrapper);
  list.appendChild(li);
}

function updateTaskList() {
  const tasks = localStorageService.getTasks();
  list.innerHTML = "";
  tasks.forEach(addTaskToList);
}
