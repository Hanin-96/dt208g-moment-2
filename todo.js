var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
    }
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
    return TodoList;
}());
var newList = new TodoList();
console.log(newList.todos);
newList.addTodo("Hej", 2);
console.log(newList.todos);
