function Task(taskName, dueDate, priority) {
    this.taskName = taskName;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
    
    this.getTaskDetail = function () {
        return `${this.taskName} (Due: ${this.dueDate}, Priority: ${this.priority}, Completed: ${this.completed})`;
    };
    
    this.toggleCompletion = function () {
        this.completed = !this.completed;
    };
}

// 2. Tasks Collection (Array)
const taskList = [];

// 4. Array Methods & Spread Syntax
function addTask(...tasks) {
    taskList.push(...tasks);
}

function deleteLastTask() {
    taskList.pop();
}

function addTaskToFront(...tasks) {
    taskList.unshift(...tasks);
}

function deleteFirstTask() {
    taskList.shift();
}

// 6. Promise, Async/Await & JSON
function saveTasks() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

async function loadTasks() {
    const savedTasks = localStorage.getItem('taskList');
    if (savedTasks) {
        taskList.length = 0; // Clear the existing taskList
        const parsedTasks = JSON.parse(savedTasks);
        taskList.push(...parsedTasks);
    }
}

// 7. DOM Basics
function renderTasks() {
    const taskListDiv = document.getElementById('task-list');
    taskListDiv.innerHTML = ''; // Clear the previous content

    taskList.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = `
            <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
            <label for="task-${index}">${task.getTaskDetail()}</label>
            <button onclick="deleteTaskUI('${task.taskName}')">Delete</button>
        `;
        taskDiv.classList.add('task');
        taskListDiv.appendChild(taskDiv);

        // Add event listener to toggle completion status
        const checkbox = taskDiv.querySelector(`#task-${index}`);
        checkbox.addEventListener('change', () => {
            task.toggleCompletion();
            saveTasks();
        });
    });
}

function addTaskUI() {
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    if (taskName && dueDate && priority) {
        const newTask = new Task(taskName, dueDate, priority);
        addTask(newTask);
        saveTasks();
        renderTasks();
        document.getElementById('task-name').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('priority').value = '';
    }
}

function deleteTaskUI(taskName) {
    const taskIndex = taskList.findIndex(task => task.taskName === taskName);
    if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
    }
}

// Load saved tasks when the page loads
loadTasks();
renderTasks();

// Add task button click event
const addTaskButton = document.getElementById('add-task');
addTaskButton.addEventListener('click', addTaskUI);
