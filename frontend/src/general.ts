let logout_btn2 = document.querySelector('.logout-btn') as HTMLButtonElement;

logout_btn2.addEventListener('click',()=>{
    localStorage.removeItem('user_email')
    localStorage.removeItem('token')
    location.href = "login.html"
})