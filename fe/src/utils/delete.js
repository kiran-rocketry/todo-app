import { deleteTodo } from "../../../be/controllers/todo";

export function deleteTask(){
const deleteBtn = taskItem.querySelector(".menu-delete");
deleteBtn.addEventListener("click", async () => {
  const taskId = taskItem.dataset.id; // <-- Access the ID here

  if (!taskId) {
    console.error("Task ID not found.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;

  try {
    await deleteTodo(taskId); // Call your API to delete from DB
    taskItem.remove(); // Remove from DOM
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
});
}