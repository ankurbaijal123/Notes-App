'use strict'
// localStorage.clear()
let notes = getSavedNotes()

const filters={
    searchtext:'',
    sortBy: 'byEdited'
}

rendernotes(notes,filters)

//unique id 
document.querySelector('#creat').addEventListener('click',(e) => {
   const id = generateUUID()
    const timestamp = moment().valueOf()
    notes.push({
        id:id,
        title:'',
        body:'',
        createdAt: timestamp,
        updatedAt: timestamp
    })
   
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})


document.querySelector('#search-box').addEventListener('input',(e) => {
   filters.searchtext= e.target.value
   rendernotes(notes,filters)
})
document.querySelector('#filter-by').addEventListener('change',(e) => {
    filters.sortBy = e.target.value
    rendernotes(notes,filters)
})

window.addEventListener('storage',(e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        rendernotes(notes,filters)
    }
      
 })




  