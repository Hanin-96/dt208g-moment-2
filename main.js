"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var todo_1 = require("./todo");
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
    todo.addTodo(toDoText.value, Number(selectPrio.value)); //Test
    var toDoListWrap = document.querySelector(".todo-wrap");
    toDoListWrap.replaceChildren(); //Tar bort tidigare todos
    todo.getTodos().forEach(function (todoEl) {
        makeToDo(toDoListWrap, todoEl);
    });
}
//Skriva ut till DOM
function makeToDo(toDoListWrap, todoEl) {
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
    //Append textnodes med element
    btnFinishEl.appendChild(btnFinishText);
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
}
