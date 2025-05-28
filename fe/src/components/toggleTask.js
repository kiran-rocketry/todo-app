export function renderToggletask() {

  const incompleteTab = document.querySelector('.incomplete-tab');
  const completeTab = document.querySelector('.complete-tab')
  const incompleteList = document.querySelector('.incomplete-list');
  const completeList = document.querySelector('.complete-list');

  incompleteTab.addEventListener('click', () => {
    incompleteList.style.display = 'block';
    completeList.style.display = 'none';

    incompleteTab.classList.add('active');
    completeTab.classList.remove('active');
  });

  completeTab.addEventListener('click', () => {
    incompleteList.style.display = 'none';
    completeList.style.display = 'block';

    completeTab.classList.add('active');
    incompleteTab.classList.remove('active');
  });
}