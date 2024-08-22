const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function displayTasks() {
  console.log('Tasks:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task} ${task.completed ? '(Completed)' : ''}`);
  });
}

function addTask() {
  rl.question('Enter a new task: ', (task) => {
    tasks.push({ task, completed: false });
    console.log(`Task added: ${task}`);
    displayTasks();
    saveTasksToFile();
    menu();
  });
}

function saveTasksToFile() {
  const tasksJson = JSON.stringify(tasks, null, 2);
  fs.writeFileSync('tasks.json', tasksJson);
  console.log('Tasks saved to tasks.json');
}

function deleteTask() {
  displayTasks();
  rl.question('Enter the task number to delete: ', (index) => {
    const taskIndex = parseInt(index) - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      tasks.splice(taskIndex, 1);
      console.log(`Task deleted: ${index}`);
    } else {
      console.log('Invalid task number');
    }
    displayTasks();
    menu();
  });
}

function viewTasks() {
  displayTasks();
  menu();
}

function markTaskAsComplete() {
  displayTasks();
  rl.question('Enter the task number to mark as complete: ', (index) => {
    const taskIndex = parseInt(index) - 1;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
      tasks[taskIndex].completed = true;
      console.log(`Task marked as complete: ${index}`);
    } else {
      console.log('Invalid task number');
    }
    displayTasks();
    menu();
  });
}

function menu() {
  console.log('Menu:');
  console.log('1. Add task');
  console.log('2. Delete task');
  console.log('3. View tasks');
  console.log('4. Mark task as complete');
  console.log('5. Quit');
  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        addTask();
        break;
      case '2':
        deleteTask();
        break;
      case '3':
        viewTasks();
        break;
      case '4':
        markTaskAsComplete();
        break;
      case '5':
        console.log('Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid choice');
        menu();
    }
  });
}

menu();