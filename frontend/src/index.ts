let user_email = localStorage.getItem('user_email') as string
let username_placeholder = document.querySelector('.username') as HTMLDivElement;
let logout_btn = document.querySelector('.logout-btn') as HTMLButtonElement;

username_placeholder.innerHTML = user_email;


logout_btn.addEventListener('click',()=>{
    console.log("gfdg");
    
    localStorage.removeItem('user_email')
    localStorage.removeItem('token')
    location.href = "login.html"
})
