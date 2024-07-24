// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const currentDate = document.getElementById('currentDate');

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
});
