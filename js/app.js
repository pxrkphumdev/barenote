// Note class
class Note {
  constructor(id, text, cost){
    this.id = id
    this.text = note,
    this.cost = cost
  }
}

// UI Class
class UI {
  // Display note list
  static displayNotes() {
    
    // From localStorage
    const notes = Store.getNotes()

    notes.forEach((note) => UI.addNoteToList(note))
  }

  // Add note UI
  static addNoteToList(note){
    const list = document.querySelector('#note-list')
    const row = document.createElement('tr')
    row.innerHTML = `
      <th scope="row">${note.id}</th>
      <td>฿ ${ note.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
      <td class="text">${note.text}</td>
      <td><a href='#' class="btn btn-danger btn-sm delete round">X</a></td>
    `
    list.appendChild(row)
  }

  // Update a note
  static updateNote(el){
    if(el.classList.contains('text')){
      // console.log(el.textContent)
      const text = prompt('How change ?', el.textContent)
      el.textContent = text

      // Update note from Store
      Store.updateNote(el, text)
    }

  }

  // Delete a note
  static deleteNote(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove()
    }
  }
}

// Store
class Store {
  static getNotes(){
    let notes
    if(localStorage.getItem('notes') === null){
      notes = []
    } else {
      notes = JSON.parse(localStorage.getItem('notes'))
    }
    return notes
  }

  static addNote(note){
    const notes = Store.getNotes()
    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes))
  }

  static updateNote(el, text){
    const id = el.parentElement.firstElementChild.textContent
    const notes = Store.getNotes()
    notes.forEach((note, index) => {
      if(note.id == id){
        note.text = text
      }
    })

    localStorage.setItem('notes', JSON.stringify(notes))
  }

  static removeNote(id){
    const notes = Store.getNotes()
    notes.forEach((note, index) => {
      if(note.id == id){
        notes.splice(index, 1)
      }
    })

    localStorage.setItem('notes', JSON.stringify(notes))
  }
}


// Event: Display Notes
document.addEventListener('DOMContentLoaded', UI.displayNotes)

// Event: Add a note
document.querySelector('#note-add').addEventListener('click', () => {
  const id = Store.getNotes().length == 0 ? 1 : Store.getNotes()[Store.getNotes().length-1].id+1
  console.log(id)
  const text = prompt('What would you like to note ?')
  const cost = prompt('How much ?')

  const note = {id, text, cost}

  // Add note to UI
  UI.addNoteToList(note)

  // Add note to Store
  Store.addNote(note)
})

// Event: Update a note
document.querySelector('#note-list').addEventListener('click', (e) => {
  // Update note from UI
  UI.updateNote(e.target)

})


// Event: Remove a note
document.querySelector('#note-list').addEventListener('click', (e) => {
  // Delete note from UI
  UI.deleteNote(e.target)

  // Delete note from Store
  Store.removeNote(e.target.parentElement.parentElement.firstElementChild.textContent)
})


function updateDateTime() {
  // create a new `Date` object
  const now = new Date();

  // get the current date and time as a string
  const currentDateTime = now.toLocaleString();

  // update the `textContent` property of the `span` element with the `id` of `datetime`
  document.querySelector('#datetime').textContent = currentDateTime;
}

// call the `updateDateTime` function every second
setInterval(updateDateTime, 1000);