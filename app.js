//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event listeners
todoButton.addEventListener("click", (event) => {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const todoItem = document.createElement("li");
  todoItem.innerText = todoInput.value;
  saveLocalTodo(todoInput.value);
  todoItem.classList.add("todo-item");
  todoDiv.appendChild(todoItem);
  //Buttons
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("completeBtn");
  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todoDiv.appendChild(completeBtn);
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
  todoDiv.appendChild(deleteBtn);
  todoInput.value = "";
  todoList.appendChild(todoDiv);
});

todoList.addEventListener("click", (e) => {
  const theButton = e.target;
  if (theButton.classList[0] === "deleteBtn") {
    removeLocalTodo(theButton.parentElement.innerText)
    const todo = theButton.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  } else if (theButton.classList[0] === "completeBtn") {
    const todo = theButton.parentElement;
    todo.classList.toggle("completed");
  }
});

const saveLocalTodo = (todo) => {
  let todos;
  if (!localStorage.getItem("todos")) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  let todos;
  if (!localStorage.getItem("todos")) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if (todos.length > 0) {
    //Traditional way
    for (let i = 0; i < todos.length; i++) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      const todoItem = document.createElement("li");
      todoItem.innerText = todos[i];
      todoItem.classList.add("todo-item");
      todoDiv.appendChild(todoItem);
      //Buttons
      const completeBtn = document.createElement("button");
      completeBtn.classList.add("completeBtn");
      completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      todoDiv.appendChild(completeBtn);
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
      todoDiv.appendChild(deleteBtn);
      todoInput.value = "";
      todoList.appendChild(todoDiv);
    }
  }
};


const removeLocalTodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let newTodos = todos.filter(todoE => todoE !== todo)
    localStorage.setItem('todos', JSON.stringify(newTodos))
}