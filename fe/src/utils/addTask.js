import {
  createTodo,
  getTodos,
} from "../services/taskapi.js";;

import { renderTask } from "../components/taskHandlers.js";

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
      console.log("Add Task button clicked");
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
