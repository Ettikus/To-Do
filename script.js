// script.js

document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const currentDate = document.getElementById('currentDate');
    const printBtn = document.getElementById('printBtn');
    const savePdfBtn = document.getElementById('savePdfBtn');

    // Display current date
    const date = new Date();
    currentDate.textContent = date.toDateString();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    timeInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    printBtn.addEventListener('click', () => {
        window.print();
    });

    savePdfBtn.addEventListener('click', saveAsPDF);

    function addTask() {
        const taskText = taskInput.value.trim();
        const timeText = timeInput.value.trim();
        if (taskText !== '' && timeText !== '') {
            const li = document.createElement('li');
            li.textContent = `${taskText} - ${timeText}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                taskList.removeChild(li);
            });

            li.appendChild(deleteBtn);
            li.addEventListener('click', () => {
                li.classList.toggle('completed');
            });

            taskList.appendChild(li);
            taskInput.value = '';
            timeInput.value = '';
        }
    }

    function saveAsPDF() {
        const doc = new jsPDF();

        doc.text('To-Do List', 10, 10);
        doc.text(currentDate.textContent, 10, 20);

        const items = taskList.getElementsByTagName('li');
        let y = 30;
        for (let i = 0; i < items.length; i++) {
            doc.text(items[i].textContent.replace('Delete', '').trim(), 10, y);
            y += 10;
        }

        doc.save('todo-list.pdf');
    }
});
