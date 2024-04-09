import { TodoList, Todo } from "./todo";

window.onload = refreshTodos;

let todo: TodoList = new TodoList();

console.log(todo.getTodos());

//Hämta submitknapp
let btnSubmit = document.getElementById("btn-submit") as HTMLInputElement;



btnSubmit.addEventListener("click", submitTodo);


function submitTodo(event): void {
    event.preventDefault()
    //Hämta DOM element
    let toDoText = document.getElementById("todo-text") as HTMLTextAreaElement;
    let selectPrio = document.getElementById("priority") as HTMLSelectElement;

    //Kontrollera tom textsträng
    let trimText = toDoText.value.trim();

    if (trimText !== '') {
        let newTodo: Todo = {} as Todo;
        newTodo.task = toDoText.value.trim();
        newTodo.priority = Number(selectPrio.value)
        newTodo.completed = false;

        todo.addTodo(newTodo.task, newTodo.priority);

        // Tar bort och lägger till nya todos
        refreshTodos();

        resetTodoInput(toDoText, selectPrio);
        todo.saveToLocalStorage();
    }

}



//Skriva ut till DOM
function makeToDo(toDoListWrap: HTMLDivElement, todoEl: Todo, index: number) {
    console.log("Todo task:", todoEl.task);
    console.log("Priority:", todoEl.priority);
    console.log("Completed:", todoEl.completed);

    let articleEl = document.createElement("article");
    let h3El = document.createElement("h3");
    let spanEl = document.createElement("span");
    let btnWrapEl = document.createElement("div");
    let btnFinishEl = document.createElement("button");
    let btnDeleteEl = document.createElement("button");

    //Lägger till class attribut
    spanEl.className = "priority-num";
    btnWrapEl.className = "btn-wrap";
    btnFinishEl.className = "btn-finished";
    btnDeleteEl.className = "btn-delete";

    //Ändra färg beroende på prioritet
    if (todoEl.priority == 1) {
        spanEl.style.backgroundColor = "#074772";
    } else if (todoEl.priority == 2) {
        spanEl.style.backgroundColor = "#1874b1";
    } else {
        spanEl.style.backgroundColor = "#50a2da";
    }


    //Skapar textnodes
    let spanText = document.createTextNode(todoEl.priority.toString());
    let h3Text = document.createTextNode(todoEl.task);
    let btnFinishText = document.createTextNode("Avklarad");
    let btnDeleteText = document.createTextNode("Ta bort");
    let btnCheckIcon = document.createElement("i");

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

    if(todoEl.completed) {
        articleEl.className = "todo-completed";
        btnFinishEl.disabled = true;
        btnFinishEl.style.cursor = "unset"
    }

    btnFinishEl.addEventListener("click", () => {
        todo.markTodoCompleted(index);
        articleEl.className = "todo-completed";
        btnFinishEl.disabled = true;
    });

    btnDeleteEl.addEventListener("click", () => {

        todo.markTodoDeleted(index);
        // Tar bort och lägger till nya todos
        refreshTodos();

    });
}

//Rensa input fälten
function resetTodoInput(toDoText: HTMLTextAreaElement, selectPrio: HTMLSelectElement): void {
    toDoText.value = "";
    selectPrio.value = "1";
}

function refreshTodos(): void {
    let toDoListWrap = document.querySelector(".todo-wrap") as HTMLDivElement;
        toDoListWrap.replaceChildren(); //Tar bort tidigare todos

        //Sortera todos efter priority ordning
        const sortedTodos = todo.getTodos().sort((a, b) => a.priority - b.priority);

        sortedTodos.forEach((todoEl, index) => {
            makeToDo(toDoListWrap, todoEl, index);
        });

}
