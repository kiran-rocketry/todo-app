// taskManager

import { taskMenu } from "../components/taskMenu.js";
import { doneUndo } from "../utils/doneUndo.js";
import { TaskMenuModal } from "../utils/taskMenuModal.js";
import { deleteTask } from "../utils/deleteTask.js";
import { setupEditTask } from "../utils/editTask.js";

// Render a single task
export function renderTask(task, taskList) {
  const taskItem = document.createElement("div");
  taskItem.dataset.id = task._id;
  taskItem.className = "task-item";
  taskItem.dataset.title = task.title;
  taskItem.dataset.description = task.description;
  taskItem.dataset.created = new Date(task.createdAt).toLocaleString();
  taskItem.dataset.completed = task.isCompleted;

  const isCompleted = task.isCompleted;

  taskItem.innerHTML = `
    <div class="task-content">
      <div class="task-text">
        <h4>${task.title}</h4>
        <p>${task.description}</p>
      </div>
      <div class="task-actions">
        <button class="${isCompleted ? "undo-btn" : "done-btn"}">
          <span class="tick">
            <i class="fa-solid ${isCompleted ? "fa-rotate-left" : "fa-check"}"></i>
          </span>
          ${isCompleted ? "Undo" : "Done"}
        </button>
        <div class="menu-wrapper">
          <div class="menu-icon">...</div>
          <ul class="task-menu hidden">
            <li><button class="menu-view">View Details</button></li>
            <li><button class="menu-edit">Edit</button></li>
            <li><button class="menu-delete">Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // Append the task to the correct list
  taskList.appendChild(taskItem);
  deleteTask(taskItem, task);
  taskMenu(taskItem);
  setupEditTask(taskItem, task)
  doneUndo(taskItem, task, renderTask);
  TaskMenuModal(taskItem, task);
}
