//Interface Todo
interface Todo {
    task: string;
    completed: boolean;
    priority: number

}

//Implementerar interface Todo i en klass
class TodoList {
    todos: Todo[];

    constructor() {
        this.todos = [];
    }

    //Metod för nya todos med prioriteringar
    addTodo(task: string, priority: number): boolean {
        if (task && task != "" && priority && priority > 0 && priority < 4) {
            let todo: Todo = { task: task, priority: priority, completed: false };
            this.todos.push(todo);
            return true;
        } else {
            return false;
        }
    }

}

let newList: TodoList = new TodoList();

console.log(newList.todos);
newList.addTodo("Hej", 2);

console.log(newList.todos);
