export function taskMenuDetail() {
  return `
    <div id="task-details-model" class="modal_detail">
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



// export function taskMenuDetail(task) {
//   return `
//     <div id="viewModalOverlay" class="view-modal-overlay">
//       <div id="viewTaskModal" class="view-modal">
//         <div class="heading">
//          <h3>${task.todo.title}</h3>
//         <button class="close-view-btn">&times;</button>
//         </div>
//           <div class="heading-des">
//             <h5>Description</h5>
//             <p>${task.todo.description}</p>
//             <h5>Created</h5>
//             <p>${date(task.todo.timestamps.createdOn)}</p>
//             <h5>Status</h5>
//             <p>${task.todo.isCompleted ? "Complete" : "Incomplete"}</p>
//           </div>
//         <div class="option-btns">
//           <button class="close-view-btn">Close</button>
//           <button class="edit-view-btn" data-id="${task.todo._id}">Edit</button>
//         </div>
//       </div>
//     </div>
//   `;
// }
