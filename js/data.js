const TODO_CLASS = "todo";
const TODOS_AMOUNT = 5;

const MIN_START_ID = 1;
const MAX_START_ID = 201 - TODOS_AMOUNT;

var baseUrl = "https://jsonplaceholder.typicode.com/todos/"
var container = document.getElementById("todos")
var startId = 1


showTodos()

async function getTodos() {
	document.body.classList.remove('loaded')
	document.body.classList.add('loading')
	
    let data = []
    for (var i = 0; i < TODOS_AMOUNT; i++) {
        data.push(await fetch(baseUrl + (startId + i)))
    }
	
	let todos = []
	
    for (i = 0; i < TODOS_AMOUNT; i++) {
        if (data[i].ok) {
            todos.push(await data[i].json())
        } else {
            showError(i)
        }	
    }
	
	document.body.classList.add('loaded');
	document.body.classList.remove('loading')
	
	return todos
}

function updateTodoContainer() {
	let prevItems = document.getElementsByClassName(TODO_CLASS)
    for (var i = 0; i < prevItems.length; i++) {
        if (prevItems[i] != null) {
            prevItems[i].remove()
            i--
        }
    }

    var items = []
    for (i = 0; i < TODOS_AMOUNT; i++) {
        let item = document.createElement("div")
        item.className = TODO_CLASS
        items.push(item)
    }
	
	return items
}

function showError(index) {
	let items = updateTodoContainer()
	
    let img = document.createElement("img")
    img.setAttribute("src", "../resources/error.jpg")
    img.setAttribute("width", "300")
    img.setAttribute("height", "100")
    
    let p = document.createElement("p")
    p.appendChild(document.createTextNode("Error"))
    
    items[index].appendChild(img)
    items[index].appendChild(p)
    
    container.appendChild(items[index])
}

function createTodo(todos) {
	if (todos == null) return
	
	let items = updateTodoContainer()
	
    for (var i = 0; i < TODOS_AMOUNT; i++) {
        let id = document.createElement("div")
        id.appendChild(document.createTextNode("todo id: " + todos[i].id))
        id.className = "todo_id"

        let userId = document.createElement("div")
        userId.appendChild(document.createTextNode("user id: " + todos[i].userId))
        userId.className = "user_id"

        let title = document.createElement("div")
        title.appendChild(document.createTextNode(todos[i].title))
        title.className = "todo_title"
        
        let completed = document.createElement("div")
        completed.appendChild(document.createTextNode("completed: "+ todos[i].completed))
        completed.className = "todo_completed"
                
        items[i].appendChild(id)
        items[i].appendChild(userId)
        items[i].appendChild(title)
        items[i].appendChild(completed)
        
        container.appendChild(items[i])
    }
}


async function showTodos() {
	let todos = await getTodos()
	createTodo(todos)
}

async function prevTodos() {
    if (startId > MIN_START_ID) {
        startId -= TODOS_AMOUNT
        if(startId < MIN_START_ID) {
            startId = MIN_START_ID
        }
        await showTodos()
    }
}

async function nextTodos() {
    if (startId < MAX_START_ID) {
        startId += TODOS_AMOUNT
        if(startId > MAX_START_ID) {
            startId = MAX_START_ID
        }
        await showTodos()
    }
}
