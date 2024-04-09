//Interface Todo
export interface Todo {
    task: string;
    completed: boolean;
    priority: number

}

//Implementerar interface Todo i en klass
export class TodoList {
    private todos: Todo[];

    constructor() {
        this.todos = [];
        this.loadFromLocalStorage();
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
    //Metod för att markera todos som klara
    markTodoCompleted(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex <= this.todos.length) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    }

    //Metod för att ta bort todos
    markTodoDeleted(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex <= this.todos.length) {
            this.todos.splice(todoIndex, 1);
            this.saveToLocalStorage();
        }
    }

    //Metod för att hämta alla todos 
    getTodos(): Todo[] {
        return this.todos;
    }

    //Sparar lista i local storage
    saveToLocalStorage(): void {
        //Omvandla till sträng
        let todosList = JSON.stringify(this.todos);
        //Spara i LocalStorage
        localStorage.setItem("todos", todosList);
    }

    loadFromLocalStorage(): void {

        console.log("Loading todos from localstorage!");
        let storedTodos = localStorage.getItem('todos') as string;
        if (storedTodos && storedTodos != "") {
            this.todos = JSON.parse(storedTodos);
        } else {
            this.todos = [];
        }
    }

}
