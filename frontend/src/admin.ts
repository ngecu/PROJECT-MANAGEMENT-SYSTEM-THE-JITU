const all_user = document.querySelector('.all-user') as HTMLDivElement;
const all_pbody = document.querySelector('.project-tbody') as HTMLDivElement;
const all_ubody = document.querySelector('.user-tbody') as HTMLDivElement;

const all_projects_count = document.querySelector('.all-projects-count') as HTMLDivElement;




interface userDetails {
    first_name:string
}
const token = localStorage.getItem('token') as string;
const user_email_logged = localStorage.getItem('user_email') as string;

if(!token || !user_email_logged){
    location.href  = "login.html"
}

const fetchAllUsers = (user_token: string) => {
    console.log("fetching all users");

    fetch('http://localhost:5000/user/allUsers', {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'token': user_token
        },
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        const filteredUsers = data.filter((element:any) => element.role !== 'admin');

        all_user.innerHTML = filteredUsers.length;

        filteredUsers.forEach((element: any, index: number) => {
            const element_row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${element.first_name} ${element.last_name}</td>
                    <td>${element.email}</td>
                </tr>
            `;
            all_ubody.innerHTML += element_row;
        });

        console.log(filteredUsers);
    })
    .catch(error => {
        console.error("An error occurred while fetching users:", error);
    });
}



const fetchAllProjects = (user_token: string) => {
    console.log("fetching all users");

    fetch('http://localhost:5000/project/allProjects', {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'token': user_token
        },
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.projects);
        all_projects_count.innerHTML = `${data.projects.length}`;
        
        if (Array.isArray(data)) {
            console.log("data is ",data)

            data.forEach((element: any) => {
                console.log(typeof(element));

                const element_row = `
                <tr>
                <td>1</td>
                <td>Project A</td>
                <td><span class="badge badge-success">${element.status}</span></td>
                <td>${element.first_name} ${element.last_name}</td>

                <td>
                    <a href="edit-project.html?project=${element.project_id}" class="edit-button btn">Edit</a>
                    <a href="project.html?project=${element.project_id}" class="view-button btn">View</a>
                    <button class="delete-button btn">Delete</button>
                </td>
                </tr>
                `;
                all_pbody.innerHTML += element_row;
            });
            console.log(data);
        } else {
            console.log("Data is not an array");
        }
    })
    .catch(error => {
        console.error("An error occurred while fetching projects:", error);
    });
}




fetchAllProjects(token)
fetchAllUsers(token)

