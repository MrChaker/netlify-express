const mode = document.querySelectorAll('.mode');
const r = document.querySelector(':root');
mode[0].addEventListener('click', ()=>{
    console.log('hih')
    r.style.setProperty('--text-color', 'white');
    r.style.setProperty('--text-color2', 'black');
    r.style.setProperty('--bgkcolor', '#0C061E');
    r.style.setProperty('--bgkcolor2', '#9e9e9e');
    r.style.setProperty('--bgkcolor3', 'rgb(14 10 27)');
    r.style.setProperty('--orange2', 'white');
    r.style.setProperty('--shadow', 'black');
    r.style.setProperty('--shadow2', '#25213efc');
    r.style.setProperty('--border', '#f5ebe636');
    r.style.setProperty('--bgkcolor4', '#f74f15');
    r.style.setProperty('--err', 'rgb(210 106 106)');

    visible(0,1);
});
mode[1].addEventListener('click', ()=>{
    r.style.setProperty('--text-color', 'black');
    r.style.setProperty('--text-color2', 'white');
    r.style.setProperty('--bgkcolor', 'white');
    r.style.setProperty('--bgkcolor2', 'white');
    r.style.setProperty('--bgkcolor3', 'rgb(239 239 239)');
    r.style.setProperty('--shadow', '#bdbdb0a3');
    r.style.setProperty('--shadow2', '#bdbdb0');
    r.style.setProperty('--border', ' black');
    r.style.setProperty('--bgkcolor4', 'black');
    r.style.setProperty('--err', 'rgb(158, 17, 17)');

    visible(1,0);
});
const visible = (el1, el2)=>{
    mode[el1].classList.add('invisible');
    mode[el1].classList.remove('visible');
    mode[el2].classList.add('visible');
    mode[el2].classList.remove('invisible');
}