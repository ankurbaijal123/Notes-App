

let notes = getSavedNotes()

const filters={
    searchtext:''
}

rendernotes(notes,filters)


document.querySelector('#creat').addEventListener('click',function(e){
   const id = generateUUID()
    
    notes.push({
        id:id,
        title:'',
        body:''
    })
   
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})


document.querySelector('#search-box').addEventListener('input',function(e){
   filters.searchtext= e.target.value
   rendernotes(notes,filters)
})
document.querySelector('#filter-by').addEventListener('change',function(e){
    console.log(e.target.value)
})

window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        rendernotes(notes,filters)
    }
      
 })

