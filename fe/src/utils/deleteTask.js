import { deleteTodo } from "../services/taskapi";

export function deleteTask(taskItem, task){
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