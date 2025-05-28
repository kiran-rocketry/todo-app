export function renderHeader() {
  return `
    <div class="header">
        <h1 class= "title"> Todo App</h1>
        <div class="task-header">
            <h2> My Tasks</h2>
            <button class="add-task-btn">
                <span class="plus-icon"><i class="fa fa-plus"></i> </span>
                Add task
            </button>
        </div>
    
            <div id="overlay" class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <div class="modal-title">Create New Task </div>
                    <button class="close-button" id="closeModal">&times;</button>
                    </div>
                    <p style="color: #666;">Add a new task to your todo list</p>
                
                    <div class="modal-body">
                        <label for="taskTitle">Title</label>
                        <input type='text'id="taskTitle" placeholder="Task title"/>

                         <label for="taskDescription">Description</label>
                        <textarea id="taskDescription" placeholder="Task description"></textarea>

                    <div class="modal-footer">
                        <button class="cancel-btn" id="closeModalBtn2">Cancel</button>
                        <button class="create-btn" id="createTaskBtn">Create Task </button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
     `;
}
