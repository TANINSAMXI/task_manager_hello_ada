'use strict';
document.addEventListener('DOMContentLoaded', function() {
    // Registration Page
    if (document.body.classList.contains('registration-page')) {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                if (email && password) {
                    // Save user data to localStorage
                    localStorage.setItem('user', JSON.stringify({ email, password }));
                    alert('Registration successful. Please log in.');
                    // After successful registration
                    window.location.href = 'login.html'; // Redirect to login page
                } else {
                    alert('Please fill in all fields');
                }
            });
        }
    }

    // Login Page
    if (document.body.classList.contains('login-page')) {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;

                if (email && password) {
                    // Retrieve user data from localStorage
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (user && user.email === email && user.password === password) {
                        localStorage.setItem('loggedIn', 'true');
                        alert('Login successful');
                        // After successful login
                        window.location.href = 'index.html'; // Redirect to task management page
                    } else {
                        alert('Invalid email or password');
                    }
                } else {
                    alert('Please fill in all fields');
                }
            });
        }
    }

    // Index Page
    if (document.body.classList.contains('index-page')) {
        // Check if user is logged in
        if (localStorage.getItem('loggedIn') !== 'true') {
            window.location.href = 'login.html'; // Redirect to login page if not logged in
        }

        const taskForm = document.getElementById('taskForm');
        if (taskForm) {
            taskForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const title = document.getElementById('taskTitle').value;
                const description = document.getElementById('taskDescription').value;

                if (title && description) {
                    // Save task to localStorage
                    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                    tasks.push({ title, description });
                    localStorage.setItem('tasks', JSON.stringify(tasks));

                    // Display task
                    displayTasks();

                    // Clear form
                    taskForm.reset();
                } else {
                    alert('Please fill in all fields');
                }
            });

            // Display tasks on page load
            displayTasks();

            // Event delegation for task deletion
            document.getElementById('taskList').addEventListener('click', function(event) {
                if (event.target.classList.contains('delete')) {
                    const taskIndex = Number(event.target.dataset.index); // Convert to number
                    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                    tasks.splice(taskIndex, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    displayTasks();
                }
            });
        }
    }

    function displayTasks() {
        const taskList = document.getElementById('taskList');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            listItem.innerHTML = `<span>${task.title}: ${task.description}</span>
                                  <button class="delete" data-index="${index}">Delete</button>`;
            taskList.appendChild(listItem);
        });
    }
});
