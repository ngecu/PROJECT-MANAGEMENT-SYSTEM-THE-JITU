const all_user = document.querySelector('.all-user') as HTMLDivElement;
const all_tbody = document.querySelector('.user-tbody') as HTMLDivElement;
let logout_btn2 = document.querySelector('.logout-btn') as HTMLButtonElement;


interface userDetails {
    first_name:string
}
const token = localStorage.getItem('token') as string;
const user_email_logged = localStorage.getItem('user_email') as string;

if(!token || !user_email_logged){
    location.href  = "login.html"
}

export const fetchAllUsers = (user_token:string)=>{
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


const fetchAllProjects = (user_token:string)=>{
    console.log("fethching all users");
    
    fetch('http://localhost:5000/project/allProjects',{
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
        console.log(typeof(element));
        
        const element_row = `
        <tr>
        <td>1</td>
        <td>Project A</td>
        <td><span class="badge badge-success">${element.status}</span></td>
        <td>User 1</td>
        
        <td>
            <a href="project_edit.html?project=${element.project_id}" class="edit-button btn" >Edit</a>
            <a href="project.html?project=${element.project_id}" class="view-button btn">View</button>
            <button class="delete-button btn">Delete</button>
        </td>
    </tr>
        `
        all_tbody.innerHTML += element_row
    });
    console.log(data);
})
}



fetchAllProjects(token)
fetchAllUsers(token)

logout_btn2.addEventListener('click',()=>{
    console.log("gfdg");
    
    localStorage.removeItem('user_email')
    localStorage.removeItem('token')
    location.href = "login.html"
})