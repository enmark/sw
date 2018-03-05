console.log('index.js here!')

let index = 0

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js')
}

if (navigator.serviceWorker) {
    navigator.serviceWorker.ready
        .then(reg => {
            const form = document.getElementById('todoForm')
            form.addEventListener('submit', event => {
                event.preventDefault()

                reg.sync.register(`send-todo-${index}`)
                .then(() => {
                    console.log(`send-todo-${index} sync registered`)
                    addTodo()
                })
            })
        })
} else {
    form.addEventListener('submit', event => {
        event.preventDefault()
        addTodo()
    })
}

function addTodo() {
    const child = document.createElement('div')
    const todos = document.getElementById('todos')

    child.id = `todo${index}`
    child.className = "todo"
    child.innerHTML = document.getElementById('todoInput').value
    todos.appendChild(child)

    document.getElementById('todoInput').value = ''
    index++
}

if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('message', message => {
        if (message.data.action !== 'todo-sent') return

        const todo = message.data.todo
        const el = document.getElementById(todo)
        el.classList.add('sent')
    })
}
