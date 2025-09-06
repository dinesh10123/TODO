const inputbox = document.getElementById('inputbox');
const addbtn = document.getElementById('addbtn');
const todolist = document.getElementById('todolist');

let editTodo = null;

//function to add to do
const addTodo = () => {
    const inputText = inputbox.value.trim();
    if(inputText.length <= 0){
        alert("Yoou need to write something in your to do");
        return false;
    }

    if(addbtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(inputText);
        addbtn.value = "Add";
        inputbox.value = "";
    } 
    else {

    //create p tag
    const li = document.createElement("li");
    const p =document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    
    //create edit buttom
    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    editbtn.classList.add("btn","editbtn");
    li.appendChild(editbtn);

    //create delete buttom
    const deletebtn = document.createElement("button");
    deletebtn.innerText = "Remove";
    deletebtn.classList.add("btn", "deletebtn");
    li.appendChild(deletebtn);

    todolist.appendChild(li);
    inputbox.value = "";

    saveLocalTodos(inputText);
 }
}

//function to update do to
const updateTodo = (e) => {
    if(e.target.innerHTML === "Remove"){
        todolist.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if(e.target.innerHTML === "Edit"){
        inputbox.value = e.target.previousElementSibling.innerHTML;
        inputbox.focus();
        addbtn.value = "Edit";
        editTodo = e;
    }
}

//function to save local to do
const saveLocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } 
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    // console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));

}

//function to get local to do
const getLocalTodos = () => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } 
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            //create p tag
    const li = document.createElement("li");
    const p =document.createElement("p");
    p.innerHTML = todo;
    li.appendChild(p);

    
    //create edit buttom
    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    editbtn.classList.add("btn","editbtn");
    li.appendChild(editbtn);

    //create delete buttom
    const deletebtn = document.createElement("button");
    deletebtn.innerText = "Remove";
    deletebtn.classList.add("btn", "deletebtn");
    li.appendChild(deletebtn);

    todolist.appendChild(li);
        })
    }
}

//function to delete local to do
const deleteLocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } 
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todoText);
}

//function to edit local todos
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputbox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}


document.addEventListener('DOMContentLoaded', getLocalTodos);
addbtn.addEventListener('click', addTodo);
todolist.addEventListener('click', updateTodo);