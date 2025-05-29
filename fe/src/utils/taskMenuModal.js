import { taskMenuEdit } from "../components/taskMenuEdit.js";
import { taskMenuDetail } from "../components/taskMenuDetail.js";
import { updateTodo } from "../services/taskapi.js";
import { renderTask } from "../components/taskHandlers.js";

export function TaskMenuModal(taskItem, task) {
  const viewBtn = taskItem.querySelector(".menu-view");
  viewBtn.addEventListener("click", () => {
    // Remove any existing modal
    const existingModal = document.querySelector(".modal-overlay");
    if (existingModal) existingModal.remove();

    // Insert new modal HTML into the body
    document.body.insertAdjacentHTML("beforeend", taskMenuDetail(task));

    // Get modal elements
    const modal = document.querySelector(".modal-overlay");
    // Close modal when clicking outside modal content

    const outsideClickHandler = (e) => {
      // Close only if the click target is the overlay itself (not the inner modal content)
      if (e.target === modal) {
        modal.remove();
        document.removeEventListener("click", outsideClickHandler);
      }
    };
    document.addEventListener("click", outsideClickHandler);
    const closeButtons = modal.querySelectorAll(
      ".modal-close, .close-view-btn"
    );

    // Handle close events
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("Closing modal...");
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
      const closeButtons = editModal.querySelectorAll(
        ".modal-close, .close-edit-btn"
      );
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
}
