function createTag(task, parent) {
  const tag = document.createElement("span");
  if (!task.deletedAt) {
    tag.classList.add("active");
    tag.textContent = strings.summary.tag.active;
  } else {
    tag.classList.add("inactive");
    tag.textContent = strings.summary.tag.inactive;
  }

  parent.appendChild(tag);
}

function createEditButton(task, parent) {
  const editButton = document.createElement("button");
  editButton.textContent = strings.summary.editButton;
  editButton.classList.add("edit");
  editButton.addEventListener("click", function () {
    const newName = prompt(strings.editPrompt, task.name);
    if (newName) {
      localStorageService.editTaskName(task.id, newName);
      updateTaskList();
      updateSummary();
    }
  });

  parent.appendChild(editButton);
}

function createDeleteButton(task, parent) {
  const hardDeleteButton = document.createElement("button");
  hardDeleteButton.textContent = strings.summary.deleteButton;
  hardDeleteButton.classList.add("delete");
  hardDeleteButton.addEventListener("click", function () {
    localStorageService.hardDeleteTask(task.id);
    updateTaskList();
    updateSummary();
  });

  parent.appendChild(hardDeleteButton);
}

function addTableRow(task, tbody) {
  const tr = document.createElement("tr");

  const daysUntilNow = countDaysUntilDate(task.deletedAt ?? task.insertedAt);
  const days = task.completedAt.length;

  [task.name, days, daysUntilNow].forEach((text) => {
    const td = document.createElement("td");
    td.textContent = text;
    tr.appendChild(td);
  });

  const actionWrapper = document.createElement("div");
  actionWrapper.classList.add("action-wrapper");

  createEditButton(task, actionWrapper);
  createDeleteButton(task, actionWrapper);
  createTag(task, actionWrapper);

  const td = document.createElement("td");
  td.appendChild(actionWrapper);
  tr.appendChild(td);

  tbody.appendChild(tr);
}

function updateSummary() {
  summary.innerHTML = "";
  const tasks = localStorageService.getTasks();

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");

  strings.summary.headers.forEach((header, index) => {
    const th = document.createElement("th");

    if (index === 0) {
      th.setAttribute("id", "first");
    }

    if (index === 3) {
      th.setAttribute("id", "last");
    }

    th.textContent = header;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  table.appendChild(thead);

  tasks.forEach((task) => addTableRow(task, tbody));

  table.appendChild(tbody);
  summary.appendChild(table);
}
