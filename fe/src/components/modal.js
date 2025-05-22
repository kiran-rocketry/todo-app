export function renderModal ()
{ return `
<div class="model-overlay" id="taskModel" style="display: none;">
    <div class="model">
        <button class="modal-close" id="closeModal">&times;
        </button>
        <h2>Create New Task </h2>
        <p>Add a new task to your todo list.</p>
        <h2>Create New Task</h2>
        <p>Add a new task to your todo list. </p>

        <label for="taskTitle">Title</label>
        <input type="text" id= "taskTitle" placeholder="Task title"/>

        <label for="taskDescription">Description</label>
        <textarea id="taskDescription" placeholder="Task description"></textarea>

        <div class="modal-actions">
            <button id="cancelBtn" class="cancel-btn">Cancel</button>
            <button id="createBtn" class="create-btn">Create Task</button>
        </div>
    </div>
</div>

`;
}










export function setupModalHandlers(){
    const modal=document.getElementById("taskModal");
    const addTaskBtn=documentFragment.querySlector(".add-task-btn");
    const closeModalBtn=document.getElementById("closeModal");
    const cancelBtn=document.getElementById("cancelBtn");

    if(!modal || !addTaskBtn || !closeModalBtn || !cancelBtn) return;

    addTaskBtn.addEventListener("click", () => {
        modal.style.display="flex";
    });

      closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
