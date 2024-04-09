"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
//Implementerar interface Todo i en klass
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
        this.loadFromLocalStorage();
    }
    //Metod för nya todos med prioriteringar
    TodoList.prototype.addTodo = function (task, priority) {
        if (task && task != "" && priority && priority > 0 && priority < 4) {
            var todo = { task: task, priority: priority, completed: false };
            this.todos.push(todo);
            return true;
        }
        else {
            return false;
        }
    };
    //Metod för att markera todos som klara
    TodoList.prototype.markTodoCompleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex <= this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    };
    //Metod för att ta bort todos
    TodoList.prototype.markTodoDeleted = function (todoIndex) {
        if (todoIndex >= 0 && todoIndex <= this.todos.length) {
            this.todos.splice(todoIndex, 1);
            this.saveToLocalStorage();
        }
    };
    //Metod för att hämta alla todos 
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    //Sparar lista i local storage
    TodoList.prototype.saveToLocalStorage = function () {
        //Omvandla till sträng
        var todosList = JSON.stringify(this.todos);
        //Spara i LocalStorage
        localStorage.setItem("todos", todosList);
    };
    TodoList.prototype.loadFromLocalStorage = function () {
        //console.log("Loading todos from localstorage!");
        var storedTodos = localStorage.getItem('todos');
        if (storedTodos && storedTodos != "") {
            this.todos = JSON.parse(storedTodos);
        }
        else {
            this.todos = [];
        }
    };
    return TodoList;
}());
exports.TodoList = TodoList;
