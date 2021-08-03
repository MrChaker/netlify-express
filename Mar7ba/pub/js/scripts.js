/*!
    * Start Bootstrap - SB Admin v7.0.0 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
    console.log('7aya')

    const makeAdmin = document.querySelectorAll('.makeAdmin');
    const Delete = document.querySelectorAll('.Delete');
    
    
    makeAdmin.forEach( el => {
        el.addEventListener('click', async(e)=>{  
            console.log(el.dataset.doc);     
                const res = fetch('/Admin/users',{
                    method : "POST",
                    body : JSON.stringify({ id: el.dataset.doc }),
                    headers : { 'Content-Type' : 'application/json'}
                });
                
                el.innerHTML = "is Admin";
                el.classList.remove('makeAdmin')
                
    })

    });
    //deleting users
    
    Delete.forEach( el => {
        el.addEventListener('click', async()=>{  
            console.log(el.classList); 
            const endpoint = el.classList.contains('d2') ? '/Admin/posts' : '/Admin/users' ;   
                
                const res = fetch(endpoint,{
                    method : "DELETE",
                    body : JSON.stringify({ id: el.dataset.doc }),
                    headers : { 'Content-Type' : 'application/json'}
                });
                el.parentNode.parentNode.style.display ="none";
                
    })

    })

    //deleting Posts
    
});
