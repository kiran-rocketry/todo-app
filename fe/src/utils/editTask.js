import { updateTodo } from "../services/taskapi.js";
import { taskMenuEdit } from "../components/taskMenuEdit.js";
import { renderTask } from "../components/taskHandlers.js";

export function setupEditTask(taskItem, task) {
  // Find the "Edit" button inside the task item
  const editBtn = taskItem.querySelector(".menu-edit");

  // If the button doesn't exist, warn and stop
  if (!editBtn) {
    console.warn("Edit button not found.");
    return;
  }

  // When the edit button is clicked
  editBtn.addEventListener("click", () => {
    // Remove any previously opened edit modal
    const existingModal = document.querySelector(".modal-overlay");
    if (existingModal) existingModal.remove();

    // Insert the edit modal into the body
    document.body.insertAdjacentHTML("beforeend", taskMenuEdit(task));

    const editModal = document.querySelector(".modal-overlay");
    const closeButtons = editModal.querySelectorAll(
      ".modal-close, .close-edit-btn"
    );
    const saveButton = editModal.querySelector(".save-edit-btn");
    const titleInput = editModal.querySelector("#edit-title");
    const descInput = editModal.querySelector("#edit-description");

    // ✅ Close when clicking outside modal content
    const outsideClickHandler = (e) => {
      if (e.target === editModal) {
        editModal.remove();
        document.removeEventListener("click", outsideClickHandler);
      }
    };
    document.addEventListener("click", outsideClickHandler);

    // Close buttons
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => editModal.remove());
    });

    // When the "Save" button is clicked
    saveButton.addEventListener("click", async () => {
      // Create updated task object with new values
      const updatedTask = {
        ...task,
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
      };

      // Show alert if title is empty
      if (!updatedTask.title) {
        alert("Title cannot be empty");
        return;
      }

      try {
        // Send updated task to backend
        await updateTodo(task._id, updatedTask);

        // Remove the old task element from the DOM
        const oldTaskItem = document.querySelector(`[data-id="${task._id}"]`);
        if (oldTaskItem) oldTaskItem.remove();

        // Decide which list to re-render the task in (complete/incomplete)
        const targetList = updatedTask.isCompleted
          ? document.querySelector(".complete-list")
          : document.querySelector(".incomplete-list");

        // Render the updated task in the correct list
        renderTask(updatedTask, targetList);

        // Close the edit modal
        document.body.style.pointerEvents = "auto";
      } catch (err) {
        console.error("Failed to update task", err);
      }
    });
  });
}
