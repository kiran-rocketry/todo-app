export function taskMenu(taskItem) {
  const menuIcon = taskItem.querySelector(".menu-icon");
  const taskMenu = taskItem.querySelector(".task-menu");
  const viewBtn = taskMenu.querySelector(".menu-view");

  if (!menuIcon || !taskMenu) return;

  // Toggle menu on icon click
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation(); 
    taskMenu.classList.toggle("hidden");
  });

  // Hide menu if clicking outside
  document.addEventListener("click", (e) => {
    if (!taskItem.contains(e.target)) {
      taskMenu.classList.add("hidden");
    }
  });
}

