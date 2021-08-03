//page swtichter 
const switcher = document.querySelectorAll('.switcher');
const pagecount = document.querySelector('.pagecount');

var pagecounter = 1 ;
switcher[0].style.cursor ="not-allowed";

switcher[0].addEventListener('click', (e)=>{
    
    if(pagecounter != 1){
        pagecounter--;
        pagecount.innerHTML = `${pagecounter}`;
        switcher[0].style.cursor ="pointer";
    }else{
        switcher[0].style.cursor ="not-allowed";
    }
});
switcher[1].addEventListener('click', (e)=>{
    if(pagecounter != 15){
        pagecounter++;
        pagecount.innerHTML = `${pagecounter}`;
        switcher[0].style.cursor ="pointer";
    }else{
        e.style.cursor ="not-allowed";
    }
});
//details page
