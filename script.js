// const todoInput = document.getElementById('todo-input');
// const addTodoButton = document.getElementById('add-todo');
// const todoList = document.getElementById('todo-list');

// const API_URL = 'http://localhost:5001/api/todos';

// const fetchTodos = async () => {
//     const response = await fetch(API_URL);
//     const todos = await response.json();
//     todoList.innerHTML = '';
//     todos.forEach(todo => {
//         const li = document.createElement('li');
//         const todoText = document.createElement('span');
//         todoText.textContent = todo.text;
//         const buttonContainer = document.createElement('div');
//         const editButton = document.createElement('button');
//         editButton.textContent = 'Edit';
//         editButton.classList.add('edit');
//         editButton.addEventListener('click', () => editTodo(todo._id, todo.text));
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.classList.add('delete');
//         deleteButton.addEventListener('click', () => deleteTodo(todo._id));
//         buttonContainer.appendChild(editButton);
//         buttonContainer.appendChild(deleteButton);
//         li.appendChild(todoText);
//         li.appendChild(buttonContainer);
//         todoList.appendChild(li);
//     });
// };

// const addTodo = async () => {
//     const todoText = todoInput.value;
//     if (todoText) {
//         await fetch(API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ text: todoText })
//         });
//         todoInput.value = '';
//         fetchTodos();
//     }
// };

// const editTodo = async (id, text) => {
//     const updatedText = prompt('Edit todo:', text);
//     if (updatedText) {
//         await fetch(`${API_URL}/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ text: updatedText })
//         });
//         fetchTodos();
//     }
// };

// const deleteTodo = async (id) => {
//     await fetch(`${API_URL}/${id}`, {
//         method: 'DELETE'
//     });
//     fetchTodos();
// };

// addTodoButton.addEventListener('click', addTodo);
// fetchTodos();
















// const tone = document.getElementById('tone');


// document.addEventListener("DOMContentLoaded", () => {
//    const inputField = document.querySelector(".task-input");
//    const addButton = document.querySelector(".add-btn");
//    const taskList = document.querySelector(".task-list");
//    const tasksLeft = document.querySelector(".tasks-left");
//    const tasksCompleted = document.querySelector(".tasks-completed");
//    const celebration = document.querySelector(".celebration");


//    function updateTaskCount() {
//        const totalTasks = document.querySelectorAll(".task-item").length;
//        const completedTasks = document.querySelectorAll(".task-item.completed").length;


//        tasksLeft.innerText = totalTasks - completedTasks;
//        tasksCompleted.innerText = completedTasks;


//        if (totalTasks > 0 && totalTasks === completedTasks) {
//            celebration.classList.remove("hidden");
//        } else {
//            celebration.classList.add("hidden");
//        }
//    }


//    function addTask() {
//        const taskText = inputField.value.trim();
//        if (taskText === "") {
//            alert("Please enter a task.");
//            return;
//        }


//        const li = document.createElement("li");
//        li.classList.add("task-item");


//        const checkbox = document.createElement("input");
//        checkbox.type = "checkbox";
//        checkbox.classList.add("checkbox");
//        checkbox.addEventListener("change", function() {
//            tone.play()
//            li.classList.toggle("completed");
//            updateTaskCount();
//        });


//        const taskSpan = document.createElement("span");
//        taskSpan.innerText = taskText;
//        taskSpan.classList.add("task-text");


//        const editButton = document.createElement("button");
//        editButton.innerText = "Edit";
//        editButton.classList.add("edit-btn");
//        editButton.addEventListener("click", function() {
//            editTask(taskSpan);
//        });


//        const deleteButton = document.createElement("button");
//        deleteButton.innerText = "Delete";
//        deleteButton.classList.add("delete-btn");
//        deleteButton.addEventListener("click", function() {
//            taskList.removeChild(li);
//            updateTaskCount();
//        });


//        li.appendChild(checkbox);
//        li.appendChild(taskSpan);
//        li.appendChild(editButton);
//        li.appendChild(deleteButton);
//        taskList.appendChild(li);


//        inputField.value = "";
//        updateTaskCount();
//    }


//    function editTask(taskSpan) {
//        const currentText = taskSpan.innerText;
//        const newText = prompt("Edit your task:", currentText);
//        if (newText && newText.trim() !== "") {
//            taskSpan.innerText = newText.trim();
//        }
//    }


//    addButton.addEventListener("click", addTask);


//    inputField.addEventListener("keypress", function(event) {
//        if (event.key === "Enter") {
//            addTask();
//        }
//    });
// });





const todoInput = document.querySelector(".task-input");
const addTodoButton = document.querySelector(".add-btn");
const todoList = document.querySelector(".task-list");
const tasksLeft = document.querySelector(".tasks-left");
const tasksCompleted = document.querySelector(".tasks-completed");
const celebration = document.querySelector(".celebration");
const tone = document.getElementById('tone');

const API_URL = 'http://localhost:5001/api/todos';

// Fetch tasks from API and update the task list
const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const todos = await response.json();
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (todo.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', () => toggleComplete(todo._id, li));

        const todoText = document.createElement('span');
        todoText.textContent = todo.text;
        todoText.classList.add('task-text');

        const buttonContainer = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editTodo(todo._id, todo.text));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteTodo(todo._id));

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(todoText);
        li.appendChild(buttonContainer);
        todoList.appendChild(li);
    });

    updateTaskCount();
};

// Add a new task to the API
const addTodo = async () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: todoText })
        });
        todoInput.value = '';
        fetchTodos();
    } else {
        alert("Please enter a task.");
    }
};

// Edit a task via API
const editTodo = async (id, text) => {
    const updatedText = prompt('Edit your task:', text);
    if (updatedText && updatedText.trim()) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: updatedText })
        });
        fetchTodos();
    }
};

// Delete a task via API
const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    fetchTodos();
};

// Toggle task completion via API
const toggleComplete = async (id, li) => {
    tone.play();
    const isCompleted = li.classList.toggle('completed');
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: isCompleted })
    });
    fetchTodos();
};

// Update task count display
const updateTaskCount = () => {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item.completed').length;

    tasksLeft.innerText = totalTasks - completedTasks;
    tasksCompleted.innerText = completedTasks;

    if (totalTasks > 0 && totalTasks === completedTasks) {
        celebration.classList.remove('hidden');
    } else {
        celebration.classList.add('hidden');
    }
};

// Event listeners
addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Initial fetch of tasks
fetchTodos();





