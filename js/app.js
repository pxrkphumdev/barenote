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
  // Display Name
  static displayName(){
    const name = Store.getName()

    const el = document.querySelector('#name')
    el.textContent = name
  }

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
      <td class="cost">฿ ${ note.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</td>
      <td class="text">${note.text}</td>
      <td><a href='#' class="btn btn-danger btn-sm delete rounded-circle" type="button">X</a></td>
    `
    list.appendChild(row)
  }

  // Update a note
  static updateNote(el){
    
    const id = el.parentElement.firstElementChild.textContent

    const notes = Store.getNotes()
    const note = notes.filter(e => e.id == id)[0]

    let newNote = note

    // console.log(notes)
    // console.log(newNote)

    if(el.classList.contains('text')){
      // console.log(el.textContent)
      const text = prompt('How change ?', el.textContent)
      el.textContent = text
      
      newNote = {...note, 'text': text}
    }

    if(el.classList.contains('cost')){
      // console.log(el.textContent)
      const cost = prompt('How much ?', el.textContent)
      el.textContent = cost
      
      newNote = {...note, 'cost': cost}
    }
    
    // Update note from Store
    Store.updateNote(id, newNote)
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
  // Name store
  static getName(){
    let name
    if(localStorage.getItem('name') === null || JSON.parse(localStorage.getItem('name')) == ""){
      name = 'Quickly and easily note with Barenote.'
    } else {
      name = JSON.parse(localStorage.getItem('name'))
    }
    return name
  }

  static setName(name){
    localStorage.setItem('name', JSON.stringify(name))
  }

  // Note store
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

  static updateNote(id, {text, cost}){
    // console.log(newNote)
    const notes = Store.getNotes()
    let newNotes = []
    notes.forEach(note => {
      if(note.id == id){
        newNotes.push({id, text, cost})
      }else{
        newNotes.push(note)
      }
    })
    

    console.log(newNotes)

    localStorage.setItem('notes', JSON.stringify(newNotes))
    // console.log({...notes, {id, text: newNote.text, cost: newNote.cost}})
    
    // const nn = {...notes, {id:id, text: newNote.text, cost: newNote.cost}}

    // localStorage.setItem('notes', JSON.stringify(newNotes))
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

// Event: Set name
document.querySelector('#name').addEventListener('click', () => {
  const name = prompt('What the name you would like to set ?')
  
  // Store
  Store.setName(name)
  
    // UI
    UI.displayName(name)
})

// Event: Display Notes
document.addEventListener('DOMContentLoaded', UI.displayName)
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
  if(!confirm('Are your sure to delete this record ?')){
    return 0
  }
  // Delete note from UI
  UI.deleteNote(e.target)

  // Delete note from Store
  Store.removeNote(e.target.parentElement.parentElement.firstElementChild.textContent)
})


function updateDateTime() {
  // create a new `Date` object
  const now = new Date();

  // get the current date and time as a string
  const currentDateTime = now.toLocaleString()
  const currentDateTimeString = now.toISOString().slice(0,10)

  // update the `textContent` property of the `span` element with the `id` of `datetime`
  document.querySelector('#datetime').textContent = currentDateTime;
  document.title = 'Barenote_' + currentDateTimeString;
}

// call the `updateDateTime` function every second
setInterval(updateDateTime, 1000);