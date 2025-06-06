// Note class
class Note {
  constructor(id, text, cost) {
    this.id = id
      ; (this.text = note), (this.cost = cost)
  }
}

// Datetime
class Datetime {
  static getFullTime(date) {
    const d = new Date(date)
    return `${d.getHours()}:${(d.getMinutes() < 10 ? "0" : "") + d.getMinutes()
      }`
  }
}

// UI Class
class UI {
  // Display Name
  static displayName() {
    const name = Store.getName()

    const el = document.querySelector("#name")
    el.textContent = name
  }

  // Display total
  static displayTotal() {
    const notes = Store.getNotes()
    let total = 0

    total = notes.reduce(
      (sum, note) => sum + parseInt(note.cost.toString().replace(/\D/g, "")),
      0
    )
    document.querySelector("#total").textContent =
      "฿ " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Display note list
  static displayNotes() {
    // From localStorage
    const notes = Store.getNotes()

    notes.forEach((note) => UI.addNoteToList(note))
  }

  // Add note UI
  static addNoteToList(note) {
    const list = document.querySelector("#note-list")
    const row = document.createElement("tr")
    row.classList.add("odd:bg-white")
    row.classList.add("even:bg-gray-50")
    row.classList.add("border-b")
    row.classList.add("border-gray-200")

    row.innerHTML = `
      <th scope="row">${note.id}</th>
      <td class="cost" class="d-inline-flex text-nowrap">${note.cost}</td>
      <td class="note text-left">
       <p class="font-light text-xs italic text-gray-500">[${Datetime.getFullTime(
      note.time.start
    )} , ${Datetime.getFullTime(note.time.stop)}]</p>
       <p class="text">${note.text}</p>
      </td>
      <td><button type="button" class="bg-red-500 text-white px-2 rounded-full delete" type="button">X</button></td>
    `
    list.appendChild(row)
  }

  // Update a note
  static updateNote(el) {
    // el = #note-list
    let id = el.parentElement.firstElementChild.textContent
    if (el.classList.contains("text")) {
      // .text two level deep to #note-list
      id = el.parentElement.parentElement.firstElementChild.textContent
    }

    // console.log(id)

    const notes = Store.getNotes()
    const note = notes.filter((e) => e.id == id)[0]

    let newNote = note

    // console.log(notes)
    // console.log(newNote)

    if (el.classList.contains("text")) {
      // console.log(el.textContent)
      const text = prompt("How change ?", el.textContent)
      const finalText = text == null ? "Please note something!" : text
      el.textContent = finalText

      newNote = { ...note, text: finalText }
    }

    if (el.classList.contains("cost")) {
      // console.log(el.textContent)
      // const cost = prompt('How much ?', el.textContent)
      const cost =
        "฿ " +
        prompt("How much ?", el.textContent)
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      const newCost = cost
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      el.textContent = cost
      console.log(cost)
      console.log(newCost)

      console.log(newNote)

      newNote = { ...note, cost: newCost }
    }

    // Update note to Store
    Store.updateNote(id, newNote)
  }

  // Delete a note
  static deleteNote(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove()
    }
  }

  static clearFiled() {
    document.getElementById("timestart").innerHTML = ""
    document.getElementById("timestop").innerHTML = ""
  }
}

// Store
class Store {
  static setTotal() {
    const notes = Store.getNotes()
    let total = 0

    total = notes.reduce(
      (sum, note) => sum + parseInt(note.cost.toString().replace(/\D/g, "")),
      0
    )
    document.querySelector("#total").textContent =
      "฿ " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    localStorage.setItem("total", JSON.stringify(total))
  }

  // Name store
  static getName() {
    let name
    if (
      localStorage.getItem("name") === null ||
      JSON.parse(localStorage.getItem("name")) == ""
    ) {
      name = "Quickly and easily note with Barenote."
    } else {
      name = JSON.parse(localStorage.getItem("name"))
    }
    return name
  }

  static setName(name) {
    if (name !== "") {
      localStorage.setItem("name", JSON.stringify(name))
    } else {
      localStorage.setItem("name", JSON.stringify("Clinic somewhere"))
    }
  }

  // Note store
  static getNotes() {
    let notes
    if (localStorage.getItem("notes") === null) {
      notes = []
    } else {
      notes = JSON.parse(localStorage.getItem("notes"))
    }
    return notes
  }

  static addNote(note) {
    const notes = Store.getNotes()
    notes.push(note)
    localStorage.setItem("notes", JSON.stringify(notes))
  }

  static updateNote(id, nnote) {
    // console.log(newNote)
    const notes = Store.getNotes()
    let newNotes = []
    notes.forEach((note) => {
      if (note.id == id) {
        newNotes.push(nnote)
      } else {
        newNotes.push(note)
      }
    })

    // console.log(newNotes)

    localStorage.setItem("notes", JSON.stringify(newNotes))
    // console.log({...notes, {id, text: newNote.text, cost: newNote.cost}})

    // const nn = {...notes, {id:id, text: newNote.text, cost: newNote.cost}}

    // localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  static removeNote(id) {
    const notes = Store.getNotes()
    notes.forEach((note, index) => {
      if (note.id == id) {
        notes.splice(index, 1)
      }
    })

    localStorage.setItem("notes", JSON.stringify(notes))
  }
}

// Event: Set name
document.querySelector("#name").addEventListener("click", () => {
  const name = prompt("What the name you would like to set ?")

  // Store
  Store.setName(name)

  // UI
  UI.displayName(name)
})

// Event: Display Notes
document.addEventListener("DOMContentLoaded", UI.displayName)
document.addEventListener("DOMContentLoaded", UI.displayNotes)
document.addEventListener("DOMContentLoaded", UI.displayTotal)

// Event: Add a note
// document.querySelector('#note-add').addEventListener('click', () => {
//   const id = Store.getNotes().length == 0 ? 1 : parseInt(Store.getNotes()[Store.getNotes().length - 1].id) + 1
//   // console.log(id)
//   const text = prompt('What would you like to note ?')
//   const cost = '฿ ' + prompt('How much ?').replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")

//   // console.log(cost)

//   const note = { id, text, cost }

//   // Add note to Store
//   Store.addNote(note)
//   // Add note to UI
//   UI.addNoteToList(note)

//   // Display total
//   UI.displayTotal()
// })

// Event: Update a note
document.querySelector("#note-list").addEventListener("click", (e) => {
  // Update note from UI
  UI.updateNote(e.target)

  // Display total
  UI.displayTotal()
})

// Event: Remove a note
document.querySelector("#note-list").addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete")) {
    return 0
  }

  if (!confirm("Are your sure to delete this record ?")) {
    return 0
  }
  // Delete note from UI

  // Delete note from Store
  Store.removeNote(
    e.target.parentElement.parentElement.firstElementChild.textContent
  )
  UI.deleteNote(e.target)

  // Display total
  UI.displayTotal()
})

function formatDateTime(date) {
  const year = ("0" + date.getFullYear()).slice(-4)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  const hour = ("0" + date.getHours()).slice(-2)
  const minute = ("0" + date.getMinutes()).slice(-2)
  const second = ("0" + date.getSeconds()).slice(-2)

  return { year, month, day, hour, minute, second }
}

function updateDateTime() {
  // create a new `Date` object
  const now = new Date()

  const dString = formatDateTime(now)
  // const year = ("0" + now.getFullYear()).slice(-4);
  // const month = ("0" + (now.getMonth() + 1)).slice(-2);
  // const day = ("0" + now.getDate()).slice(-2);
  // const hour = ("0" + now.getHours()).slice(-2);
  // const minute = ("0" + now.getMinutes()).slice(-2);
  // const second = ("0" + now.getSeconds()).slice(-2);

  const currentTime = `<div>${dString.year}-${dString.month}-${dString.day}</div><div>${dString.hour}:${dString.minute}:${dString.second}</div>`

  // get the current date and time as a string
  // const currentDateTime = now.toLocaleString();
  const currentDateTimeString = now.toISOString().slice(0, 10)

  // update the `textContent` property of the `span` element with the `id` of `datetime`
  document.querySelector("#datetime").innerHTML = currentTime
  document.title =
    "Barenote_" +
    `${dString.year}-${dString.month}-${dString.day}` +
    "_" +
    document.querySelector("#name").innerHTML
}

// call the `updateDateTime` function every second
setInterval(updateDateTime, 1000)
