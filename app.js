// Task Class
class Task {

    constructor(id, name, description, assignedTo, dueDate, status) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.assignedTo = assignedTo;
        this.dueDate = dueDate;
        this.status = status;
    }
}

// Task Manager Class
class TaskManager {

    constructor() {

        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        this.currentId = this.tasks.length > 0
            ? Math.max(...this.tasks.map(task => task.id)) + 1
            : 1;
    }

    // Save to Local Storage
    saveToLocalStorage() {

        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    // Add Task
    addTask(name, description, assignedTo, dueDate, status) {

        const task = new Task(
            this.currentId,
            name,
            description,
            assignedTo,
            dueDate,
            status
        );

        this.tasks.push(task);

        this.currentId++;

        this.saveToLocalStorage();

        this.displayTasks();
    }

    // Delete Task
    deleteTask(taskId) {

        this.tasks = this.tasks.filter(
            task => task.id !== taskId
        );

        this.saveToLocalStorage();

        this.displayTasks();
    }

    // Update Task
    updateTask(id, name, description, assignedTo, dueDate, status) {

        const task = this.tasks.find(task => task.id === id);

        if (task) {

            task.name = name;
            task.description = description;
            task.assignedTo = assignedTo;
            task.dueDate = dueDate;
            task.status = status;
        }

        this.saveToLocalStorage();

        this.displayTasks();
    }

    // Load Task Into Form
    editTask(id) {

        const task = this.tasks.find(task => task.id === id);

        document.getElementById("taskId").value = task.id;
        document.getElementById("name").value = task.name;
        document.getElementById("description").value = task.description;
        document.getElementById("assignedTo").value = task.assignedTo;
        document.getElementById("dueDate").value = task.dueDate;
        document.getElementById("status").value = task.status;

        document.getElementById("submitBtn").innerText = "Update";
    }

    // Display Tasks
    displayTasks() {

        const taskList = document.getElementById("taskList");

        taskList.innerHTML = "";

        this.tasks.forEach(task => {

            taskList.innerHTML += `
            
            <div class="task-card">

                <h3>${task.name}</h3>

                <p>${task.description}</p>

                <p><strong>Assigned To:</strong> ${task.assignedTo}</p>

                <p><strong>Due Date:</strong> ${task.dueDate}</p>

                <p><strong>Status:</strong> ${task.status}</p>

                <button onclick="taskManager.editTask(${task.id})">
                    Edit
                </button>

                <button onclick="taskManager.deleteTask(${task.id})">
                    Delete
                </button>

            </div>
            `;
        });
    }
}

// Create Object
const taskManager = new TaskManager();

// Display Existing Tasks
taskManager.displayTasks();

// Form Submit
document.getElementById("taskForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    // Form Values
    const id = document.getElementById("taskId").value;

    const name = document.getElementById("name").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const assignedTo =
        document.getElementById("assignedTo").value.trim();

    const dueDate =
        document.getElementById("dueDate").value;

    const status =
        document.getElementById("status").value;

    // Validation
    let valid = true;

    document.querySelectorAll("small")
        .forEach(error => error.innerText = "");

    if(name === ""){
        document.getElementById("nameError")
            .innerText = "Task name required";
        valid = false;
    }

    if(description === ""){
        document.getElementById("descriptionError")
            .innerText = "Description required";
        valid = false;
    }

    if(assignedTo === ""){
        document.getElementById("assignedError")
            .innerText = "Assigned person required";
        valid = false;
    }

    if(dueDate === ""){
        document.getElementById("dateError")
            .innerText = "Due date required";
        valid = false;
    }

    if(status === ""){
        document.getElementById("statusError")
            .innerText = "Status required";
        valid = false;
    }

    if(!valid){
        return;
    }

    // Update Task
    if(id){

        taskManager.updateTask(
            Number(id),
            name,
            description,
            assignedTo,
            dueDate,
            status
        );

        document.getElementById("submitBtn")
            .innerText = "Save";
    }

    // Add Task
    else{

        taskManager.addTask(
            name,
            description,
            assignedTo,
            dueDate,
            status
        );
    }

    // Clear Form
    document.getElementById("taskForm").reset();

    document.getElementById("taskId").value = "";
});