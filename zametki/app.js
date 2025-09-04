const inputElement = document.getElementById("title")
const createBtn = document.getElementById("create")
const listElement = document.getElementById("list")

const notes = [
    {
        title: "сделать сайт",
        completed: false,
    }
]



createBtn.onclick = function() {
    if (inputElement.value.length === 0) {
        return
    }
    else {
        notes.unshift({title: inputElement.value, completed: false})
        showList()
        inputElement.value = ""
    }
}

listElement.onclick = function(event) {
    // console.log(event.target.dataset.type)
    if (event.target.dataset.type == "toggle") {
        notes[event.target.dataset.index].completed = true
        showList()
    }
    else if (event.target.dataset.type == "remove") {
        notes.splice([event.target.dataset.index], 1)
        showList()
    }
}

function createzmtk(title, index) {
    return `<li
        class="list-group-item${title.completed ? "-done" : ""} d-flex justify-content-between align-items-center">
          <span class = ${title.completed ? "zacherknut" : ""}>${title.title}</span>
          <span>
            ${title.completed ? "" : `<span class="btn btn-small btn-success" data-index="${index}" data-type="toggle">;</span>`}
            <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">;</span>
          </span>
        </li>`
    }

function reloads(note, i) {
    listElement.insertAdjacentHTML("beforeend", createzmtk(note, i))
}

function showList(){
    listElement.innerHTML = ""
    for (let i = 0; i < notes.length; i++) {
        reloads(notes[i], i)
    }
}

showList()