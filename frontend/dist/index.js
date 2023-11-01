"use strict";
let user_email = localStorage.getItem('user_email');
let username_placeholder = document.querySelector('.username');
let logout_btn = document.querySelector('.logout-btn');
username_placeholder.innerHTML = user_email;
logout_btn.addEventListener('click', () => {
    console.log("gfdg");
    localStorage.removeItem('user_email');
    localStorage.removeItem('token');
    location.href = "login.html";
});
