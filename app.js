todoInput = document.getElementById("inputfield");
addButton = document.getElementById("add-button");

addButton.addEventListener("click", createTodoItem);
todoInput.addEventListener('keypress', (e)=>{
  if(e.code == 'Enter'){
    createTodoItem();
  }
});

let id = 0;
let activeId;
let activeEditId;
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

  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.id = `edit-${id}`;
  editButton.innerHTML = "Edit";
  editButton.addEventListener('click', () => {
    activeEditId = id;
    displayEditBox(description)})

  const removeButton = document.createElement("button");
  removeButton.className = "remove";
  removeButton.id = `remove-${id}`;
  removeButton.innerHTML = "Remove";
  removeButton.addEventListener("click", () => {
    activeId = id;
    displayDialogueBox(
        'Delete Button clicked',
        'Are you sure you want to delete this todo?',
        true,
        true,
        'DELETE_TODO'
        )
  });
  

  todoAction.appendChild(completeButton);
  todoAction.appendChild(editButton);
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

  if(validateInput(todoDescription.replace(/\s/g, ""))){
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
  
    todoInput.value = "";
  }
  else{
    
  }

}
function validateInput(input){
  if(input === ""){
    displayDialogueBox('Input Error', 'Input can not be empty', false, true, 'INPUT_ERROR');
    return false;
  }
  else if(input.length < 5){
    return false;
  }
  else{
    return true;
  }
}

// CREATE NEW FUNCTIONS
let MODE ='';
let ACTIVE_MODE='';
const mainContainer = document.getElementById('main-container');
const dialogueBox = document.getElementById('dialogue');
const closeButton = document.getElementById('close');
const dialogueTitle = document.getElementById('title');
const dialogueBody = document.getElementById('body');
const cancelButton =  document.getElementById('cancel');
const acceptButton = document.getElementById('accept');   
const background = document.getElementById('background');

background.addEventListener('click', bg)
function bg(){
  if(ACTIVE_MODE === 'DELETE'){
  closeDialogueBox();}
  else if (ACTIVE_MODE === 'EDIT'){
  closeEditBox();}
  mainContainer.style.zIndex = '10';
  background.style.zIndex = '5';
  editBox.style.zIndex = '0';
}


acceptButton.addEventListener('click', () => {
  if (MODE === 'INPUT_ERROR') {
    closeDialogueBox();
  }
  if (MODE === 'DELETE_TODO') {
    console.log('1');
    removeTodo(activeId);
    closeDialogueBox();
  }
});

cancelButton.addEventListener('click', closeDialogueBox);
closeButton.addEventListener('click', closeDialogueBox);


function displayDialogueBox(
  title,
  body,
  cancel_visible,
  accept_visible,
  mode
  ){
    MODE = mode;
    ACTIVE_MODE = 'DELETE';
  dialogueTitle.innerText = title;
  dialogueBody.innerText = body;

  cancel_visible
      ?(cancelButton.style.display = 'flex')
      :(cancelButton.style.display = 'none');
  accept_visible
      ?(acceptButton.style.display = 'flex')
      :(acceptButton.style.display = 'none');

  dialogueBox.style.display = 'flex';
  mainContainer.style.opacity = '0.2';
  mainContainer.style.zIndex = '0';
  background.style.zIndex = '5';
  dialogueBox.style.zIndex = '10';

}
function closeDialogueBox(){
  dialogueBox.style.display = 'none';
  mainContainer.style.opacity = '1';
}

//EDIT FUNCTION
const editBox = document.getElementById('edit-box');
const editCloseButton = document.getElementById('edit-close-button');
const editInput = document.getElementById('edit-input');
const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', () => {
  saveEditedTodo(activeEditId);
})

editCloseButton.addEventListener('click', closeEditBox);

function saveEditedTodo(id){

  document.getElementById(`todo-description-${id}`).innerText = editInput.value;
  closeEditBox();
}
function displayEditBox(description){
  ACTIVE_MODE = 'EDIT';
  editBox.style.display = 'flex';
  editInput.value = description;
  editInput.focus();
  mainContainer.style.opacity = '0.2';
  mainContainer.style.zIndex = '0';
  background.style.zIndex = '5';
  editBox.style.zIndex = '10';
}

function closeEditBox(){
  editBox.style.display = 'none';
  mainContainer.style.opacity = '1';
}