import { taskMenuDetail } from "./taskMenuDetail";

export function viewDetail() {
   document.body.querySelector("task-list").addEventListener("click", (e) => {
    const button = e.target.closest(".menu-view");
    if (!button) return;

    const taskElement = button.closest(".task-item");
    console.log(taskElement);
    if (!taskElement) return;

    // Remove old modal if exists
    const existingModal = document.getElementById("task-details-model");
    if (existingModal) existingModal.remove();

    // Insert modal HTML
    document.body.insertAdjacentHTML("beforeend", taskMenuDetail());

    // Query modal elements after insertion
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

    // Fill modal content
    titleEl.textContent = taskElement.dataset.title || "N/A";
    descEl.textContent = taskElement.dataset.description || "No description";
    createdEl.textContent = taskElement.dataset.created || "Unknown";
    completedEl.textContent = taskElement.dataset.completed === "true" ? "Yes" : "No";

    modal.classList.remove("hidden_detail");

    // Close modal on button click
    closeButton.onclick = () => {
      modal.classList.add("hidden_detail");
      modal.remove();  // remove modal from DOM
    };
  });
}
