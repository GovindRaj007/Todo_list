let items = []

const itemsDiv = document.getElementById("items")
const input = document.getElementById("itemInput")
const storageKey = "items"

function renderItems() {
    itemsDiv.innerHTML = null

    for (const [idx, item] of Object.entries(items)) { //entries method in objectConstructor takes array(items) and return an array of key/value pairs like [0,"item1"] [1,"item2"]
        const container = document.createElement("div")
        container.style.marginBottom = "10px"

        const text = document.createElement("p")
        text.style.display = "inline"
        text.style.marginRight = "10px"
        text.textContent = item;


        const button = document.createElement("button")
        button.textContent = "Delete"
        button.onclick = () => removeItem(idx)

        container.appendChild(text)
        container.appendChild(button)

        itemsDiv.appendChild(container)
    }
}
renderItems()

function loadItems(){
    const oldItems=localStorage.getItem(storageKey)
    if(oldItems)
        items=JSON.parse(oldItems) //oldItems is javascript object in the array form which is containing items
    renderItems()
}

function saveItems(){
    const stringItems=JSON.stringify(items)
    localStorage.setItem(storageKey,stringItems) //the stored data is saved across browser sessions means the data is cleared after the page session is ended
}

function addItem() {
    const value = input.value
    if (!value) {
        alert("You cannot add an empty item")
        return
    }
    else {
        items.push(value)
        renderItems()
        input.value=""
    }
    saveItems()
}

function removeItem(idx) {
    items.splice(idx, 1) //to remove 1(no.of elements to remove) element from start index "idx"
    renderItems()
    saveItems()
}
document.addEventListener("DOMContentLoaded",loadItems) //loadItems func is called when the page(DOMContent) is loaded initialy
