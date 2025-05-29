export function taskMenu(taskItem) {
  const menuIcon = taskItem.querySelector(".menu-icon");
  const taskMenu = taskItem.querySelector(".task-menu");

  if (!menuIcon || !taskMenu) return;

  const handleOutsideClick = (e) => {
    if (!taskItem.contains(e.target)) {
      taskMenu.classList.add("hidden");
      document.removeEventListener("click", handleOutsideClick);
    }
  };

  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();

    // 🔁 Fixed: renamed inner 'menu' to 'otherMenu'
    document.querySelectorAll(".task-menu").forEach((otherMenu) => {
      if (otherMenu !== taskMenu) {
        otherMenu.classList.add("hidden");
      }
    });

    taskMenu.classList.toggle("hidden");

    if (!taskMenu.classList.contains("hidden")) {
      document.addEventListener("click", handleOutsideClick);
    }
  });

  taskMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}



