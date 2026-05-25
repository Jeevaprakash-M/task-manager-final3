// Sample Unit Tests

const manager = new TaskManager();

// Add Test
manager.addTask(
    "Testing",
    "Unit Testing",
    "Arun",
    "2026-05-30",
    "To Do"
);

console.assert(
    manager.tasks.length === 1,
    "Add Task Failed"
);

// Update Test
manager.updateTask(
    1,
    "Updated Task",
    "Updated Desc",
    "Kumar",
    "2026-06-01",
    "Done"
);

console.assert(
    manager.tasks[0].name === "Updated Task",
    "Update Task Failed"
);

// Delete Test
manager.deleteTask(1);

console.assert(
    manager.tasks.length === 0,
    "Delete Task Failed"
);

console.log("All Tests Passed");