const all_user = document.querySelector('.all-user') as HTMLDivElement;
const all_tbody = document.querySelector('.user-tbody') as HTMLDivElement;

interface userDetails {
    first_name:string
}
const token = localStorage.getItem('token') as string;
const user_email_logged = localStorage.getItem('user_email') as string;

if(!token || !user_email_logged){
    location.href  = "login.html"
}

const fetchAllUsers = (user_token:string)=>{
    console.log("fethching all users");
    
    fetch('http://localhost:5000/user/allUsers',{
    headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'token':user_token
    },
    method: "GET",
  
}).then(res => res.json()
).then(data=>{
    all_user.innerHTML = data.length

    data.forEach(element => {
        const element_row = `
        <tr>
<td>#</td>
<td>${element.first_name} ${element.last_name}</td>
<td>${element.email}</td>
</tr>
        `
        all_tbody.innerHTML += element_row
    });
    console.log(data);
})
}





fetchAllUsers(token)