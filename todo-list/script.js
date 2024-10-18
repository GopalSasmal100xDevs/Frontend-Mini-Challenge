let todoList = [
  { title: "React", id: 1 },
  { title: "Java", id: 2 },
  { title: "JavaScript", id: 3 },
];

const todoContainer = document.querySelector("#todo-container");

const todo = document.querySelector("#todo");
todo.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoTitle = todo.querySelector("input").value;

  if (todoTitle === "") {
    return;
  }

  todo.querySelector("input").value = "";

  todoList.push({ title: todoTitle, id: Date.now() });
  render();
});

function deleteTodoFromList(id) {
  todoList = todoList.filter((item) => item.id !== id);
  render();
}

function updateTodoFromList(todoId, content) {
  todoList = todoList.map(({ id, title }) => {
    if (id === todoId) {
      return {
        id,
        title: content,
      };
    }
    return { id, title };
  });
  render();
}

function render() {
  todoContainer.innerHTML = "";
  if (todoList.length === 0) {
    const noItem = document.createElement("h1");
    noItem.innerText = "Ooops! List is empty";
    todoContainer.appendChild(noItem);
    localStorage.setItem("todos", JSON.stringify(todoList));
    return;
  }

  todoList.forEach(({ title, id }) => {
    const todoItem = document.createElement("div");
    todoItem.setAttribute("class", "todo-item");
    todoItem.setAttribute("key", id);

    const todoTitle = document.createElement("h4");
    todoTitle.innerText = title;

    const allButtons = document.createElement("div");
    allButtons.setAttribute("class", "todo-buttons");

    const editTodo = document.createElement("button");
    editTodo.setAttribute("title", "Edit");
    editTodo.setAttribute("id", "edit-btn");
    editTodo.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i>`;

    const deleteTodo = document.createElement("button");
    deleteTodo.setAttribute("title", "Delete");
    deleteTodo.setAttribute("id", "delete-btn");
    deleteTodo.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;

    todoItem.appendChild(todoTitle);
    allButtons.appendChild(deleteTodo);
    allButtons.appendChild(editTodo);
    todoItem.appendChild(allButtons);

    // Event delegation
    todoItem.addEventListener("click", (e) => {
      if (
        e.target.id == "delete-btn" ||
        e.target.parentElement?.id == "delete-btn"
      ) {
        // Delete todo
        deleteTodoFromList(id);
      } else if (
        e.target.id == "edit-btn" ||
        e.target.parentElement?.id == "edit-btn"
      ) {
        // edit todo
        todoTitle.contentEditable = true;
        todoTitle.focus();
        const saveTodo = document.createElement("button");
        saveTodo.setAttribute("id", "save-btn");
        todoTitle.setAttribute("class", "save-input");
        saveTodo.innerHTML = `<i class="fa fa-bookmark" aria-hidden="true"></i>`;
        allButtons.appendChild(saveTodo);

        saveTodo.addEventListener("click", (e) => {
          todoTitle.contentEditable = false;
          allButtons.removeChild(saveTodo);
          todoTitle.removeAttribute("class", "save-input");
          const updatedTodoTitle = todoTitle.innerText;
          updateTodoFromList(id, updatedTodoTitle);
        });
      }
    });

    todoContainer.appendChild(todoItem);
  });

  localStorage.setItem("todos", JSON.stringify(todoList));
}

// After load DOM call render function
(() => {
  todoList = JSON.parse(localStorage.getItem("todos")) || todoList;
  render();
})();
