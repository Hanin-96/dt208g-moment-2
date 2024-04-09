"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var todo_1 = require("./todo");
window.onload = refreshTodos;
var todo = new todo_1.TodoList();
console.log(todo.getTodos());
//Hämta submitknapp
var btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", submitTodo);
function submitTodo(event) {
    event.preventDefault();
    //Hämta DOM element
    var toDoText = document.getElementById("todo-text");
    var selectPrio = document.getElementById("priority");
    //Kontrollera tom textsträng
    var trimText = toDoText.value.trim();
    if (trimText !== '') {
        var newTodo = {};
        newTodo.task = toDoText.value.trim();
        newTodo.priority = Number(selectPrio.value);
        newTodo.completed = false;
        todo.addTodo(newTodo.task, newTodo.priority);
        // Tar bort och lägger till nya todos
        refreshTodos();
        resetTodoInput(toDoText, selectPrio);
        todo.saveToLocalStorage();
    }
}
//Skriva ut till DOM
function makeToDo(toDoListWrap, todoEl, index) {
    console.log("Todo task:", todoEl.task);
    console.log("Priority:", todoEl.priority);
    console.log("Completed:", todoEl.completed);
    var articleEl = document.createElement("article");
    var h3El = document.createElement("h3");
    var spanEl = document.createElement("span");
    var btnWrapEl = document.createElement("div");
    var btnFinishEl = document.createElement("button");
    var btnDeleteEl = document.createElement("button");
    //Lägger till class attribut
    spanEl.className = "priority-num";
    btnWrapEl.className = "btn-wrap";
    btnFinishEl.className = "btn-finished";
    btnDeleteEl.className = "btn-delete";
    //Ändra färg beroende på prioritet
    if (todoEl.priority == 1) {
        spanEl.style.backgroundColor = "#074772";
    }
    else if (todoEl.priority == 2) {
        spanEl.style.backgroundColor = "#1874b1";
    }
    else {
        spanEl.style.backgroundColor = "#50a2da";
    }
    //Skapar textnodes
    var spanText = document.createTextNode(todoEl.priority.toString());
    var h3Text = document.createTextNode(todoEl.task);
    var btnFinishText = document.createTextNode("Avklarad");
    var btnDeleteText = document.createTextNode("Ta bort");
    var btnCheckIcon = document.createElement("i");
    btnCheckIcon.className = "fa-solid fa-check";
    //Append textnodes med element
    btnFinishEl.appendChild(btnFinishText);
    btnFinishEl.appendChild(btnCheckIcon);
    btnDeleteEl.appendChild(btnDeleteText);
    spanEl.appendChild(spanText);
    //Append element
    btnWrapEl.appendChild(btnFinishEl);
    btnWrapEl.appendChild(btnDeleteEl);
    h3El.appendChild(spanEl);
    h3El.appendChild(h3Text);
    articleEl.appendChild(h3El);
    articleEl.appendChild(btnWrapEl);
    toDoListWrap.appendChild(articleEl);
    if (todoEl.completed) {
        articleEl.className = "todo-completed";
        btnFinishEl.disabled = true;
    }
    btnFinishEl.addEventListener("click", function () {
        todo.markTodoCompleted(index);
        articleEl.className = "todo-completed";
        btnFinishEl.disabled = true;
    });
    btnDeleteEl.addEventListener("click", function () {
        todo.markTodoDeleted(index);
        // Tar bort och lägger till nya todos
        refreshTodos();
    });
}
//Rensa input fälten
function resetTodoInput(toDoText, selectPrio) {
    toDoText.value = "";
    selectPrio.value = "1";
}
function refreshTodos() {
    var toDoListWrap = document.querySelector(".todo-wrap");
    toDoListWrap.replaceChildren(); //Tar bort tidigare todos
    todo.getTodos().forEach(function (todoEl, index) {
        makeToDo(toDoListWrap, todoEl, index);
    });
}
