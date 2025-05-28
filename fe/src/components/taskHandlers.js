import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "../services/taskapi";

import { taskMenuDetail } from "./taskMenuDetail.js";

// Setup task creation and loading
export function setupCreateTaskHandler() {
  const createBtn = document.getElementById("createTaskBtn");
  const titleInput = document.getElementById("taskTitle");
  const descInput = document.getElementById("taskDescription");
  const overlay = document.getElementById("overlay");

  async function loadTasks() {
    try {
      const rs = await getTodos();
      const tasks = rs.todos || [];
      const incompleteList = document.querySelector(".incomplete-list");
      const completeList = document.querySelector(".complete-list");

      incompleteList.innerHTML = "";
      completeList.innerHTML = "";

      tasks.forEach((task) => {
        const list = task.isCompleted ? completeList : incompleteList;
        renderTask(task, list);
      });
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  }

  loadTasks();

  if (createBtn && titleInput && descInput) {
    createBtn.addEventListener("click", async () => {
      const title = titleInput.value.trim();
      const description = descInput.value.trim();
      if (!title) {
        alert("Please enter a title");
        return;
      }

      try {
        const rs = await createTodo({ title, description });
        const incompleteList = document.querySelector(".incomplete-list");
        renderTask(rs.todo, incompleteList);
        titleInput.value = "";
        descInput.value = "";
        overlay.classList.remove("active");
      } catch (err) {
        console.error("Failed to create task:", err);
      }
    });
  }
}

// Render a single task
function renderTask(task, taskList) {
  const taskItem = document.createElement("div");
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

  // Toggle menu dropdown
  const icon = taskItem.querySelector(".menu-icon");
  const menu = taskItem.querySelector(".task-menu");
  icon.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // View Details button logic
  const viewBtn = taskItem.querySelector(".menu-view");
  viewBtn.addEventListener("click", () => {
    const existingModal = document.getElementById("task-details-model");
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML("beforeend", taskMenuDetail());

    const modal = document.getElementById("task-details-model");
    const titleEl = document.getElementById("detail-title");
    const descEl = document.getElementById("detail-description");
    const createdEl = document.getElementById("detail-date");
    const completedEl = document.getElementById("detail-completion-text");
    const closeButton = document.getElementById("close-detail");

    if (!modal || !titleEl || !descEl || !createdEl || !completedEl || !closeButton) {
      console.error("Modal elements not found");
      return;
    }

    titleEl.textContent = task.title || "N/A";
    descEl.textContent = task.description || "No description";
    createdEl.textContent = new Date(task.createdAt).toLocaleString();
    completedEl.textContent = task.isCompleted ? "Yes" : "No";

    modal.classList.remove("hidden_detail");

    closeButton.onclick = () => modal.remove();
  });

  // Mark done/undo
  const btn = taskItem.querySelector(isCompleted ? ".undo-btn" : ".done-btn");
  btn.addEventListener("click", async () => {
    try {
      const updatedTask = { ...task, isCompleted: !isCompleted };
      await updateTodo(task._id, updatedTask);
      taskItem.remove();

      const targetList = updatedTask.isCompleted
        ? document.querySelector(".complete-list")
        : document.querySelector(".incomplete-list");

      renderTask(updatedTask, targetList);
    } catch (err) {
      console.error("Failed to toggle complete status", err);
    }
  });
}
