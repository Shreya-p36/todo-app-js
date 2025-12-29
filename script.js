const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

/* ---------- CORE FUNCTIONS ---------- */

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.text;

        if (todo.completed) li.classList.add("completed");

        li.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "✕";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    input.value = "";
    saveTodos();
    renderTodos();
}

/* ---------- EVENTS ---------- */

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
});

/* ---------- INIT ---------- */

renderTodos();
