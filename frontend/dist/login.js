"use strict";
let login_email = document.getElementById('login-email');
let login_password = document.getElementById('login-password');
let login_form = document.getElementById('login-form');
let email_error = document.querySelector('#email-error');
let password_error = document.querySelector('#password-error');
function showLoginToast(message, type = 'error') {
    const toast = document.querySelector('.toast');
    const messageElement = document.getElementById('error-message');
    messageElement.innerText = message;
    if (type === 'error') {
        toast.classList.add('error-toast');
    }
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
        toast.classList.remove('error-toast');
    }, 3000);
}
login_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = login_email.value;
    let password = login_password.value;
    if (!email) {
        showLoginToast('Email address is required');
    }
    if (!password) {
        showLoginToast('Password is required');
    }
    if (!email && !password) {
        showLoginToast('All fields are required');
    }
    if (password && email) {
        const promise2 = new Promise((res, rej) => {
            fetch('http://localhost:5000/user/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }).then(res => res.json()).then(data => {
                console.log(data);
                if (data.error) {
                    showLoginToast(data.error);
                }
                else {
                    localStorage.setItem('token', data.token);
                    if (data.user.role == "admin") {
                        location.href = "admin.html";
                    }
                    else {
                        location.href = "index.html";
                    }
                }
            }).catch(error => {
                console.log(error);
                rej(error);
            });
        });
        function redirect() {
            const token = localStorage.getItem('token');
            new Promise((resolve, reject) => {
                fetch('http://localhost:5000/user/check_user_details', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'token': token
                    },
                    method: "GET"
                }).then(res => {
                    // console.log(res);
                    resolve(res.json());
                }).catch(error => {
                    reject(error);
                });
            }).then(data => {
                console.log(data['info']);
                if (data['info'].role === 'user') {
                    localStorage.setItem('user_email', data['info'].email);
                    location.href = 'user.html';
                }
                else if (data['info'].role === 'admin') {
                    localStorage.setItem('user_email', data['info'].email);
                    location.href = 'admin.html';
                }
            });
        }
    }
});
