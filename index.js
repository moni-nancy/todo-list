const todoList = document.querySelector('#todo-list');
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const form = document.querySelector('form');

//Load saved todo list items from Local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

//display saved todo list items on page load
renderTodos();

// function to render the todo list
function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const todoEl = document.createElement('li');
todoEl.innerText = todo;
//create checkbox input element
const checkboxEl = document.createElement('input');
checkboxEl.type = 'checkbox';
checkboxEl.classList.add('todo-checkbox');
checkboxEl.addEventListener('click', () => {
  todoEl.classList.toggle('completed');
});
   if (todo.completed) {
  checkboxEl.checked = true;
  todoEl.classList.add('completed');
}

    // add button to delete a todo item
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="bi bi-trash3"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteTodo(index);
    });

    // add button to edit a todo item
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
      editTodoInput(index, todo);
    });
      todoEl.appendChild(checkboxEl);
    todoEl.appendChild(editBtn);
    todoEl.appendChild(deleteBtn);
    todoList.appendChild(todoEl);
  });
}

// function to add a new todo item to the list
function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    todos.unshift(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    todoInput.value = '';
  }
}

// function to delete a todo item from the list
function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// function to handle the "Enter" key on the input field
function handleKeyPress(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addBtn.click();
  }
}

// function to update the todo item in the list
function editTodoInput(index, todo) {
  const todoEl = todoList.children[index];
  const todoText = todoEl.innerText;

  // create a new input field and set its value to the current todo item
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = todoText;
  editInput.classList.add('edit-input');

  // create a save button
  const saveBtn = document.createElement('button');
  saveBtn.innerHTML = '<i class="bi bi-check2"></i>';
  saveBtn.classList.add('save-btn');

  // replace the todo item with the input field and save button
  todoEl.innerHTML = '';
  todoEl.appendChild(editInput);
  todoEl.appendChild(saveBtn);

  // add event listener to the save button
  saveBtn.addEventListener('click', () => {
    const updatedTodo = editInput.value.trim();

    if (updatedTodo !== '') {
      todos[index] = updatedTodo;
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    }
  });
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', handleKeyPress);

renderTodos();
