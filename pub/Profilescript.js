const popup = document.querySelector('.popup');
const uploadexit = document.querySelectorAll('.exit');

//navigation

const el = document.querySelectorAll('.el');


const li = document.querySelectorAll('.profnav li');

li[0].addEventListener('click', ()=>{
    changedisplay(0,1,2);
});

li[1].addEventListener('click', ()=>{
    changedisplay(1,2,0);
});
li[2].addEventListener('click', ()=>{
    changedisplay(2,1,0);
});

const changedisplay = (el0, el1, el2)=>{
    el[el0].style.display = "block";
    li[el0].classList.add('active');
    el[el1].style.display = "none";
    li[el1].classList.remove('active');
    el[el2].style.display = "none";
    li[el2].classList.remove('active');
}

//image uploade
const uploadbtn = document.querySelector('.upload');
const uploadform = document.querySelector('.profimg');
uploadbtn.addEventListener('click',()=>{
    uploadform.style.display = 'block';
    popup.style.filter = 'blur(3px)';
});
uploadexit[0].addEventListener('click',()=>{
    uploadform.style.display = 'none';
    popup.style.filter = 'none';
});
//Portfolio
const uploadbtn3 = document.querySelector('.upload2');
const uploadform3 = document.querySelector('.uploadform3');
uploadbtn3.addEventListener('click',()=>{
    uploadform3.style.display = 'block';
    popup.style.filter = 'blur(3px)';
});
uploadexit[2].addEventListener('click',()=>{
    uploadform3.style.display = 'none';
    popup.style.filter = 'none';
});


//description upload

const uploadbtn2 = document.querySelector('.uploades');
const uploadform2 = document.querySelector('.uploadform2');
const desform = document.querySelector('.uploadform2 form');
const textform = document.querySelector('.uploadform2 form textarea');

textform.value = document.getElementById("des").dataset.doc;
uploadbtn2.addEventListener('click',()=>{
    uploadform2.style.display = 'block';
    popup.style.filter = 'blur(3px)';
});
uploadexit[1].addEventListener('click',()=>{
    uploadform2.style.display = 'none';
    popup.style.filter = 'none';
});

desform.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const description = textform.value;
    try {
        const res = await fetch('/Profile/info', {
            method : "POST",
            body : JSON.stringify({ postid: 1,description }),
            headers : { 'Content-Type' : 'application/json'}
         });
        const result = await res.json();
        if(result){
            location.assign('/Profile')
        } 
    } catch (error) {
        console.log(error)
    }
    
})
//Information upload
const inform = document.querySelector(".profbody form");
const Select = document.querySelectorAll(".Select");
const submit = document.querySelector('.btn3');
const update = document.querySelector('.btn4');

update.addEventListener('click', ()=>{         
    document.querySelector(".registerged").style.display="none";
    inform.style.display="block";
})

inform.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const fname = inform.firstname.value;
    const lname = inform.lastname.value;
    const job = Select[0].value;
    const Wilaya = Select[1].value;
    const phone = inform.phone.value;
    const fadress = inform.fulladress.value;

    try {
        const res = await fetch("/Profile/info", {
        method : "POST",
        body : JSON.stringify({ postid : 2,fname, lname, job, Wilaya, phone, fadress}),
        headers : { 'Content-Type' : 'application/json'}
    })
    /* const result = await res.json();   */ 
    location.assign("/Profile");
    } catch (error) {
        console.log(error);
    }
})


