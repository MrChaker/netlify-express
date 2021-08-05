const navel = document.querySelectorAll('#pointer li');
const bgkimg = document.querySelector('.imgcont img');
const ill = document.querySelectorAll('.ill');
const mode = document.querySelectorAll('.mode');
const r = document.querySelector(':root');

$(document).ready(()=>{
    
    $(window).scroll(()=>{
        var scroll = $(window).scrollTop();
        if(scroll < 430){
            active(0, 1, 2)
            bgkimg.classList.add('fadeInRight');       
        };
        if (scroll > 180){
            ill[0].style.display = "block";
            ill[0].classList.add('fadeInRight');
        }
         if(scroll >= 480){
            active(1, 0, 2);
            bgkimg.classList.remove('fadeInRight');       
        }; 
        if(scroll > 640){
            ill[1].style.display = "block";
            ill[1].classList.add('fadeInRight');       
        };
        if(scroll > 1000){
            ill[2].style.display = "block";
            ill[2].classList.add('fadeInRight');       
        };  
        if (scroll >= 1900){
            active(2, 0, 1);
            bgkimg.classList.remove('fadeInRight');
        }       
    });
        
        const active = (el0, el1, el2)=>{
            navel[el0].classList.add('act');
            navel[el1].classList.remove('act');
            navel[el2].classList.remove('act');
        }
    
        const clickforscroll = (el, pos)=>{
            navel[el].addEventListener('click', ()=>{
                window.scrollTo(0,pos);
            });
        }
        clickforscroll(0,0);
        clickforscroll(1,480);
        clickforscroll(2,1900);

        mode[0].addEventListener('click', ()=>{
            console.log('hih')
            r.style.setProperty('--text-color', 'white');
            r.style.setProperty('--text-color2', 'black');
            r.style.setProperty('--bgkcolor', '#0C061E');
            r.style.setProperty('--bgkcolor2', 'rgb(239 239 239)');
            r.style.setProperty('--bgkcolor3', '#0c061e');

            r.style.setProperty('--orange2', 'white');

            visible(0,1);
        });
        mode[1].addEventListener('click', ()=>{
            r.style.setProperty('--text-color', 'black');
            r.style.setProperty('--text-color2', 'white');
            r.style.setProperty('--bgkcolor', 'white');
            r.style.setProperty('--bgkcolor2', 'white');
            r.style.setProperty('--bgkcolor3', 'rgb(239 239 239)');
            r.style.setProperty('--orange2', '#f53900');

            visible(1,0);
        });
        const visible = (el1, el2)=>{
            mode[el1].classList.add('invisible');
            mode[el1].classList.remove('visible');
            mode[el2].classList.add('visible');
            mode[el2].classList.remove('invisible');
        }

    
});





