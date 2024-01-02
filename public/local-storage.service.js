class LocalStorageService {
  _cacheKey = "tasks";
  _cache = { tasks: [] };

  constructor(clearCache = false) {
    if (clearCache) {
      localStorage.clear(this._cacheKey);
    }

    const localTasks = localStorage.getItem(this._cacheKey);

    if (!localTasks) {
      localStorage.setItem(this._cacheKey, JSON.stringify({ tasks: [] }));
    } else {
      this._cache = JSON.parse(localTasks);
    }
  }

  addTask(task) {
    this._cache.tasks.push({
      id: this._cache.tasks.length + 1,
      name: task,
      insertedAt: new Date(),
      deletedAt: null,
      completedAt: [],
    });
    localStorage.setItem(this._cacheKey, JSON.stringify(this._cache));
  }

  completeTask(id) {
    const task = this.getTask(id);

    if (task) {
      if (task.completedAt.some(isBetweenToday)) {
        return;
      }

      task.completedAt.push(new Date().toISOString());
    }

    localStorage.setItem(this._cacheKey, JSON.stringify(this._cache));
  }

  uncompleteTask(id) {
    const task = this.getTask(id);

    if (task) {
      task.completedAt = task.completedAt.filter((date) => !isBetweenToday(date));
    }

    localStorage.setItem(this._cacheKey, JSON.stringify(this._cache));
  }

  restoreTask(id) {
    const task = this.getTask(id);

    if (task && task.deletedAt) {
      task.deletedAt = null;
    }

    localStorage.setItem(this._cacheKey, JSON.stringify(this._cache));
  }

  removeTask(id) {
    const task = this.getTask(id);

    if (task) {
      if (task.deletedAt && isBetweenToday(task.deletedAt)) {
        return;
      }

      task.deletedAt = new Date().toISOString();
    }

    localStorage.setItem(this._cacheKey, JSON.stringify(this._cache));
  }

  hardDeleteTask(id) {
    const taskIndex = this._cache.tasks.findIndex((task) => +task.id === +id);

    if (taskIndex !== -1) {
      this._cache.tasks.splice(taskIndex, 1);
    }

    localStorage.setItem(this._cacheKey, JSON.stringify(this._cache));
  }

  getTasks() {
    return this._cache.tasks;
  }

  getTask(id) {
    return this._cache.tasks.find((task) => +task.id === +id);
  }

  getLastTask() {
    return this._cache.tasks.sort((a, b) => b.id - a.id)[0];
  }

  editTaskName(id, name) {
    const task = this.getTask(id);

    if (task) {
      task.name = name;
    }

    localStorage.setItem(this._cacheKey, JSON.stringify(this._cache));
  }
}
