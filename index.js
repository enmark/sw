console.log('index.js here!')

navigator.serviceWorker.register('sw.js')

function addTodo(event) {
    event.preventDefault()
    const child = document.createElement('div')
    const todos = document.getElementById('todos')

    child.className = "todo"
    child.innerHTML = document.getElementById('todoInput').value
    todos.appendChild(child)

    document.getElementById('todoInput').value = ''
}