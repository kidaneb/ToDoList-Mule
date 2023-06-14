todoInput = document.getElementById("inputfield");
addButton = document.getElementById("add-button");

addButton.addEventListener("click", createTodoItem);
todoInput.addEventListener('keypress', (e)=>{
  if(e.code == 'Enter'){
    createTodoItem();
  }
});

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

function removeTodo (id,dialogue){
  todos.forEach((todo, index) =>{
    if(todo.id == id){
      todos.splice(index,1);
    }
  })
  localStorage.setItem('todos', JSON.stringify(todos));
  document.getElementById(`todo-item-${id}`).remove();
  closeDialogue(dialogue)
  console.log('1');
}
function closeDialogue(dialogue){
  const mainContainer = document.getElementById('main-container');
  mainContainer.style.opacity = '1';
  dialogue.remove();
}
function removeDialogueBox(id){
  
  const dialogue = document.createElement('div');
  dialogue.className = 'dialogue';

  // CREATING THE CLOSE BUTTON
  const closeButton = document.createElement('button');
  closeButton.className = 'close';
  closeButton.innerHTML = `<span class="material-symbols-outlined">close</span>`;
  closeButton.addEventListener('click' ,()=>closeDialogue(dialogue));
  // CREATING DIALOGUE BOX TITLE
  const dialogueTitle = document.createElement('div');
  dialogueTitle.className ='title';
  dialogueTitle.innerHTML = 'Delete Button Clicked';
  // CREATING DIALOGUE BOX BODY
  const dialogueBody = document.createElement('div');
  dialogueBody.className = 'body';
  dialogueBody.innerHTML ='Are you sure you want to delete this Todo?';
  // CREATING DIALOGUE BOX BUTTON CONTAINER AND BUTTONS ON IT
  const dialogueButtonContainer = document.createElement('div');
  dialogueButtonContainer.className = 'button-container';
  // BUTTONS IN BUTTON CONTAINER
  const accept = document.createElement('button');
  accept.className = 'accept';
  accept.innerHTML = 'YES';
  accept.addEventListener('click', ()=>removeTodo(id,dialogue))
  const cancel = document.createElement('button');
  cancel.className = 'cancel';
  cancel.innerHTML ='NO';
  cancel.addEventListener('click' ,()=>closeDialogue(dialogue));
  // APPENDING ACCEPT AND CANCEL BUTTONS TO BUTTON-CONTAINER
  dialogueButtonContainer.appendChild(cancel);
  dialogueButtonContainer.appendChild(accept);

  // APPENDING THE BUTTON-CONTAINER, TITLE, BODY TO THE DIALOGUE ELEMENT
dialogue.appendChild(closeButton);
dialogue.appendChild(dialogueTitle);
dialogue.appendChild(dialogueBody);
dialogue.appendChild(dialogueButtonContainer);

// BLURRING THE OTHER PAGE ELEMENTS
const mainContainer = document.getElementById('main-container');
mainContainer.style.opacity = '0.3';

// PUTTING THE DIALOGUE ELEMENT ON THE PAGE PROPERLY
document.querySelector('body').insertBefore(dialogue, mainContainer);
  
}
function validateDialogue(){
  const dialogue = document.createElement('div');
  dialogue.className = 'dialogue';

  // CREATING THE CLOSE BUTTON
  const closeButton = document.createElement('button');
  closeButton.className = 'close';
  closeButton.innerHTML = `<span class="material-symbols-outlined">close</span>`;
  closeButton.addEventListener('click' ,()=>closeDialogue(dialogue));
  // CREATING DIALOGUE BOX TITLE
  const dialogueTitle = document.createElement('div');
  dialogueTitle.className ='title';
  dialogueTitle.innerHTML = 'Error Input';
  // CREATING DIALOGUE BOX BODY
  const dialogueBody = document.createElement('div');
  dialogueBody.className = 'body';
  dialogueBody.innerHTML ='Please Enter the Proper input.Todos must have more than five character. ';
  // CREATING DIALOGUE BOX BUTTON CONTAINER AND BUTTONS ON IT
  const dialogueButtonContainer = document.createElement('div');
  dialogueButtonContainer.className = 'button-container';
  // BUTTONS IN BUTTON CONTAINER
  const accept = document.createElement('button');
  accept.className = 'accept';
  accept.innerHTML = 'OK';
  accept.addEventListener('click', ()=>closeDialogue(dialogue))
  
  // APPENDING ACCEPT AND CANCEL BUTTONS TO BUTTON-CONTAINER
  
  dialogueButtonContainer.appendChild(accept);

  // APPENDING THE BUTTON-CONTAINER, TITLE, BODY TO THE DIALOGUE ELEMENT
dialogue.appendChild(closeButton);
dialogue.appendChild(dialogueTitle);
dialogue.appendChild(dialogueBody);
dialogue.appendChild(dialogueButtonContainer);

// BLURRING THE OTHER PAGE ELEMENTS
const mainContainer = document.getElementById('main-container');
mainContainer.style.opacity = '0.3';

// PUTTING THE DIALOGUE ELEMENT ON THE PAGE PROPERLY
document.querySelector('body').insertBefore(dialogue, mainContainer);
  
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
  removeButton.addEventListener("click", () => removeDialogueBox(id));
  

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
    validateDialogue();
  }

}
function validateInput(input){
  if(input === ""){
    return false;
  }
  else if(input.length < 5){
    return false;
  }
  else{
    return true;
  }
}
// localStorage.clear();
