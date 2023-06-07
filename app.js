todoInput = document.getElementById("inputfield");
addButton = document.getElementById("add-button");

addButton.addEventListener("click", createTodoItem);

let id = 0;
if (localStorage.getItem("id")) {
  id = JSON.parse(localStorage.getItem("id"));
}

todos = [];
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    createtodoItemElement(todo.id, todo.description, todo.complete);
  });
}
function completeTodo(id) {
  todos.forEach((todo) => {
    if (todo.id == id) {
      todo.complete = !todo.complete;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  document
    .getElementById(`todo-description-${id}`)
    .classList.toggle("completed");
}

function removeTodo (id){
  todos.forEach((todo, index) =>{
    if(todo.id == id){
      todos.splice(index,1);
    }
  })
  localStorage.setItem('todos', JSON.stringify(todos));
  document.getElementById(`todo-item-${id}`).remove();
  console.log('1');
}

function createtodoItemElement(id, description, complete) {
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  todoItem.id = `todo-item-${id}`;

  const todoDescription = document.createElement("div");
  todoDescription.className = "todo-description";
  if (complete) {
    todoDescription.classList.add("completed");
  }
  todoDescription.id = `todo-description-${id}`;
  todoDescription.innerHTML = description;

  const todoAction = document.createElement("div");
  todoAction.className = "todo-action";
  todoAction.id = `todo-action-${id}`;

  const completeButton = document.createElement("button");
  completeButton.className = "complete";
  completeButton.id = `complete-${id}`;
  completeButton.innerHTML = "Complete";
  completeButton.addEventListener("click", () => completeTodo(id));

  const removeButton = document.createElement("button");
  removeButton.className = "remove";
  removeButton.id = `remove-${id}`;
  removeButton.innerHTML = "Remove";
  removeButton.addEventListener("click", () => removeTodo(id));
  

  todoAction.appendChild(completeButton);
  todoAction.appendChild(removeButton);

  todoItem.appendChild(todoDescription);
  todoItem.appendChild(todoAction);

  document
    .getElementById("todo-item-container")
    .insertBefore(
      todoItem,
      document.getElementById("todo-item-container").firstChild
    );
}



function createTodoItem() {
  todoDescription = todoInput.value;
  todoItem = {
    id: id,
    description: todoDescription,
    complete: false,
  };
  id++;
  localStorage.setItem("id", JSON.stringify(id));

  todos.push(todoItem);
  localStorage.setItem("todos", JSON.stringify(todos));
  createtodoItemElement(todoItem.id, todoItem.description, todoItem.complete);

 ;
}
// localStorage.clear();
