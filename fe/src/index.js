import { renderBody } from './components/body.js';
import { renderHeader } from './components/header.js';
import { setupCreateTaskHandler } from './utils/addTask.js'
import { renderToggletask } from './components/toggleTask.js';
import './styles/main.css';

const app = document.getElementById('app');
if (!app) {
  console.error('App element not found.');
} else{
app.innerHTML = `
    ${renderHeader()}
    ${renderBody()}
  `.trim();

setupCreateTaskHandler(); // ✅ Add event listeners after DOM is created

renderToggletask();
initApp(); // call you setup logic

}

function initApp(){
const overlay = document.getElementById('overlay');
const addBtn = document.querySelector('.add-task-btn');
const closeBtn = document.querySelector('.close-button');
const cancelBtn = document.querySelector('.cancel-btn');
// const viewBtn = document.querySelector('.task-details-model')
if (!addBtn) {
  console.warn('addBth not found.');
  return;
}
if (!closeBtn) {
  console.warn('closeBtn not found.');
  return;
}
if (!cancelBtn) {
  console.warn('cancelBtn not found.');
  return;
}
if (!overlay) {
  console.warn('overlay not found.');
  return;
}
// if (!viewBtn)
// {
//   return;
// }

  // Your event listeners here
  addBtn.addEventListener('click', () => {
    overlay.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  cancelBtn.addEventListener('click', () => {
    overlay.classList.remove('active');

  });
}
