export function taskMenuDetail() {
  return `
    <div id="task-details-model" class="modal_detail hidden_detail">
      <div class="modal-content_detail">
        <button class="modal-close" id="close-detail">&times;</button>
        <h2 class="task-title">
          <span id="detail-title"></span>
          <span id="detail-status" class="status_detail-tag"></span>
        </h2>
        <div class="detail-field_detail">
          <p class="label">Description</p>
          <p id="detail-description"></p>
        </div>
        <div class="detail-field_detail">
          <p class="label">Created</p>
          <p id="detail-date"></p>
        </div>
        <div class="detail-field_detail">
          <p class="label">Status</p>
          <p id="detail-completion-text"></p>
        </div>
        <div class="modal_detail_actions">
          <button id="close-detail" class="btn">Close</button>
          <button id="edit-task" class="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  `;
}
