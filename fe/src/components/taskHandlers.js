// taskManager.js

import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "../services/taskapi.js";

import { taskMenuDetail } from "./taskMenuDetail.js";
import { taskMenuEdit } from "./taskMenuEdit.js";

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

  // Toggle menu dropdown
  const icon = taskItem.querySelector(".menu-icon");
  const menu = taskItem.querySelector(".task-menu");
  icon.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

    // Edit button in menu
  const editBtn = taskItem.querySelector(".menu-edit");
  editBtn.addEventListener("click", () => {
    // Remove any existing modal
    const existingModal = document.querySelector(".modal-overlay");
    if (existingModal) existingModal.remove();

    // Insert the edit modal
    document.body.insertAdjacentHTML("beforeend", taskMenuEdit(task));

    const editModal = document.querySelector(".modal-overlay");
    const closeButtons = editModal.querySelectorAll(".modal-close, .close-edit-btn");
    const saveButton = editModal.querySelector(".save-edit-btn");
    const titleInput = editModal.querySelector("#edit-title");
    const descInput = editModal.querySelector("#edit-description");

    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => editModal.remove());
    });

    saveButton.addEventListener("click", async () => {
      const updatedTask = {
        ...task,
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
      };

      if (!updatedTask.title) {
        alert("Title cannot be empty");
        return;
      }

      try {
        await updateTodo(task._id, updatedTask);

        const oldTaskItem = document.querySelector(`[data-id="${task._id}"]`);
        if (oldTaskItem) oldTaskItem.remove();

        const targetList = updatedTask.isCompleted
          ? document.querySelector(".complete-list")
          : document.querySelector(".incomplete-list");

        renderTask(updatedTask, targetList);

        editModal.remove();
      } catch (err) {
        console.error("Failed to update task", err);
      }
    });
  });


  const viewBtn = taskItem.querySelector(".menu-view");
  viewBtn.addEventListener("click", () => {
    // Remove any existing modal
    const existingModal = document.querySelector(".modal-overlay");
    if (existingModal) existingModal.remove();

    // Insert new modal HTML into the body
    document.body.insertAdjacentHTML("beforeend", taskMenuDetail(task));

    // Get modal elements
    const modal = document.querySelector(".modal-overlay");
    const closeButtons = modal.querySelectorAll(".modal-close, .close-view-btn");

    // Handle close events
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.remove();
      });
    });

    // Handle ESC key to close modal
    const escListener = (e) => {
      if (e.key === "Escape") {
        modal.remove();
        document.removeEventListener("keydown", escListener);
      }
    };
    document.addEventListener("keydown", escListener);

    // Handle edit button inside the view modal
    const editButton = modal.querySelector(".edit-view-btn");
    editButton.addEventListener("click", () => {
      modal.remove(); // Close the current view modal

      // Remove any existing modal
      const existingModal = document.querySelector(".modal-overlay");
      if (existingModal) existingModal.remove();

      // Insert the edit modal
      document.body.insertAdjacentHTML("beforeend", taskMenuEdit(task));

      const editModal = document.querySelector(".modal-overlay");
      const closeButtons = editModal.querySelectorAll(".modal-close, .close-edit-btn");
      const saveButton = editModal.querySelector(".save-edit-btn");
      const titleInput = editModal.querySelector("#edit-title");
      const descInput = editModal.querySelector("#edit-description");

      closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => editModal.remove());
      });

      saveButton.addEventListener("click", async () => {
        const updatedTask = {
          ...task,
          title: titleInput.value.trim(),
          description: descInput.value.trim(),
        };

        if (!updatedTask.title) {
          alert("Title cannot be empty");
          return;
        }

        try {
          await updateTodo(task._id, updatedTask);

          const oldTaskItem = document.querySelector(`[data-id="${task._id}"]`);
          if (oldTaskItem) oldTaskItem.remove();

          const targetList = updatedTask.isCompleted
            ? document.querySelector(".complete-list")
            : document.querySelector(".incomplete-list");

          renderTask(updatedTask, targetList);

          editModal.remove();
        } catch (err) {
          console.error("Failed to update task", err);
        }
      });
    });
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

  // Delete task
  const deleteBtn = taskItem.querySelector(".menu-delete");
  deleteBtn.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTodo(task._id);
        taskItem.remove();
      } catch (err) {
        console.error("Failed to delete task", err);
      }
    }
  });
}
