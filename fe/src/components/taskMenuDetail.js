export function taskMenuDetail(task) {
  return `
    <div id="viewModalOverlay" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>${task.title}</h2>
          <button class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <h5>Description</h5>
            <p>${task.description || 'No description provided.'}</p>
          </div>
          <div class="modal-section">
            <h5>Created</h5>
            <p>${new Date(task.timestamps.createdOn).toLocaleString()}</p>
          </div>
          <div class="modal-section">
            <h5>Status</h5>
            <p class="${task.isCompleted ? 'status-complete' : 'status-incomplete'}">
              ${task.isCompleted ? 'Complete' : 'Incomplete'}
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn close-view-btn">Close</button>
          <button class="btn btn-primary edit-view-btn" data-id="${task._id}">Edit</button>
        </div>
      </div>
    </div>
  `;
}
