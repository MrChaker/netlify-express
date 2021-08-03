const drop = document.querySelector('.drop');
const dropmenu = document.querySelector('.dropmenu');

drop.addEventListener('click', ()=>{
    if(dropmenu.style.display === "block"){
        dropmenu.style.display = "none"
    }else{
    dropmenu.style.display = "block"
    }
})