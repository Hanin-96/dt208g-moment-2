import { TodoList, Todo } from "./todo";


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

    todo.addTodo(toDoText.value, Number(selectPrio.value)); //Test

    let toDoListWrap = document.querySelector(".todo-wrap") as HTMLDivElement;
    toDoListWrap.replaceChildren(); //Tar bort tidigare todos

    todo.getTodos().forEach(todoEl => {
        makeToDo(toDoListWrap, todoEl);
    });
}

//Skriva ut till DOM
function makeToDo(toDoListWrap: HTMLDivElement, todoEl: Todo) {
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
    if(todoEl.priority == 1) {
        spanEl.style.backgroundColor = "#074772";
    } else if(todoEl.priority == 2) {
        spanEl.style.backgroundColor = "#1874b1";
    } else {
        spanEl.style.backgroundColor = "#50a2da";
    }


    //Skapar textnodes
    let spanText = document.createTextNode(todoEl.priority.toString());
    let h3Text = document.createTextNode(todoEl.task);
    let btnFinishText = document.createTextNode("Avklarad");
    let btnDeleteText = document.createTextNode("Ta bort");

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

