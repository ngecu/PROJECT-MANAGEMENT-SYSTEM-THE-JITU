let addform = document.querySelector('.add-project-form') as HTMLFormElement




addform.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("sadas");
    

    const project_name = document.getElementById('pname') as HTMLInputElement;
    const project_description = document.getElementById('pdescr') as HTMLInputElement;
    const user = document.querySelector('#user') as HTMLSelectElement;

    const Pname = project_name.value;
    const Pdescr = project_description.value;
    const Puser = user.value;

    if (Pname.trim() !== '' && Pdescr.trim() !== '' && Puser.trim() !== '') {
        try {
            const response = await fetch('http://localhost:5000/project/addProject', {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    "title": Pname,
                    "description": Pdescr,
                    "user_id": Puser
                })
            });

            const data = await response.json();

            if (data.error) {
                alert("error")
            } else {
                location.href = 'all-projects.html';
            }

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
});



 const fetchAllU = (user_token:string)=>{
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
    const x = document.querySelector('#user') as HTMLSelectElement;
    console.log(data);
    

    data.forEach(element => {
        const element_row = `
        <option valu="${element.user_id}">${element.first_name} ${element.last_name}</option>
        `
        x.innerHTML += element_row
    });
    console.log(data);
})
}

fetchAllU()