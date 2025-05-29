  // Mark done/undo\
import { updateTodo } from "../services/taskapi.js";

export function doneUndo(taskItem, task, renderTask) {
  const isCompleted = task.isCompleted; // ✅ define it here

  const btn = taskItem.querySelector(isCompleted ? ".undo-btn" : ".done-btn");

  if (!btn) return; // Safety check

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