'use strict'
//read existing notes from localstrorage 
function generateUUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });
}

const remove = (id) => {
      const index = notes.findIndex((note) =>  note.id===id)
      if(index > -1){
        notes.splice(index,1)
      }
}

let getSavedNotes = () => {
    const notesJson= localStorage.getItem('notes')
    
  try { 
    return notesJson? JSON.parse(notesJson) : []
}catch(e){
    return []
}
    
}

//generate dom structure
const generateNoteDom = (note) => {
    const list = document.createElement('a')
    const container = document.createElement('div')
    const button = document.createElement('button')
    button.textContent='x'
    container.appendChild(button)
    button.addEventListener('click',function(e){
        remove(note.id)
        saveNotes(notes)
        rendernotes(notes,filters)
    })
    if(note.title.length>0){
        list.textContent = note.title
    }else{
        list.textContent = 'Unnamed note'
    }
    list.setAttribute('href',`/edit.html#${note.id}`)
    container.appendChild(list)

    return container
}
let saveNotes = (notes) => {
    localStorage.setItem('notes',JSON.stringify(notes))
}

const sortNotes = (notes , sortBy) => {
       if(sortBy == 'byEdited'){
         return notes.sort(function(a,b){
             if(a.updatedAt > b.updatedAt){
                 return -1
             }else if(a.updatedAt < b.updatedAt){
                 return 1
             }else{
                 return 0
             }
         })
       }
       else if(sortBy == 'byCreated'){
        return notes.sort(function(a,b){
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt > b.createdAt){
                return 1
            }else{
                return 0
            }
        })
     }
     else if(sortBy == 'alphabetical'){
        return notes.sort(function(a,b){
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }else{
                return 0
            }
        })
     }
}

//render notes or application
const rendernotes = (notes,filters) => {
    notes = sortNotes(notes,filters.sortBy)
    const filternotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchtext.toLowerCase())
    })

    document.querySelector('#notes').innerHTML=''

    filternotes.forEach(function(note){
        const list =  generateNoteDom(note)
        document.querySelector('#notes').appendChild(list)
   })
    
}
const generateLastEdit = (timeStamp) =>  `last edited ${moment(note.updatedAt).fromNow()}`

