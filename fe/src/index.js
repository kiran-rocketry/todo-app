import{renderHeader} from'./components/header.js'
import{renderBody} from'./components/body.js'
import'./styles/main.css'
const app = document.getElementById('app')

if(app){
    app.innerHTML=`
    ${renderHeader()}
    ${renderBody()}
    `.trim();
    // Attach event listeners AFTER injecting HTML
    const overlay = document.getElementById('overlay');
    const modal = document.querySelector('.modal');
    const addBtn = document.querySelector('.add-task-btn');
    const closeBtn = document.querySelector('.close-button');


  if (addBtn && modal && closeBtn) {
    addBtn.addEventListener('click', () => {
         overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active'); // hide overlay + modal
    });
    


  } else {
    console.warn('One or more modal elements not found.');
  }
} else {
  console.error('App element not found');
}


