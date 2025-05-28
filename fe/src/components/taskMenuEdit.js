// taskMenuEdit.js

export function taskMenuEdit(task) {
  return `
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Edit Task</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <label for="edit-title">Title</label>
            <input type="text" id="edit-title" value="${task.title}">
          </div>
          <div class="modal-section">
            <label for="edit-description">Description</label>
            <textarea id="edit-description">${task.description}</textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn close-edit-btn">Cancel</button>
          <button class="btn btn-primary save-edit-btn" data-id="${task._id}">Save</button>
        </div>
      </div>
    </div>
  `;
}
