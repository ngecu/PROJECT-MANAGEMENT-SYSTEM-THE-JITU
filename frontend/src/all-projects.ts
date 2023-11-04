const all_tbody2 = document.querySelector('tbody') as HTMLDivElement;

const getAllProjects = async () => {
    try {
        const response = await fetch('http://localhost:5000/project/allProjects', {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: 'GET',
        });

        const data = await response.json();
        // console.log(data);


        const no_data_tr = `<tr class="no-data-row">
        <td colspan="5">No Projects</td>
    </tr>
    `


        if (data.length == 0) {
            all_tbody2.innerHTML = "";
            all_tbody2.innerHTML = no_data_tr;
        }
        else{
            let tableHTML = '';
                        data.forEach((element:any, index:number) => {
                            console.log(element);
                            
                tableHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${element.title}</td> <!-- Replace 'projectName' with the actual property name in your data -->
                        <td>${element.status}</td>
                        <td>${element.first_name} ${element.last_name}</td>
                        <td>
                            <a href="project.html?project=${element.project_id}" class="edit-button" >Edit</a>
                            <button class="delete-button" >Delete</button>
                        </td>
                    </tr>
                `;
            });
            
            const tableBody = document.querySelector('table tbody') as HTMLElement;
            tableBody.innerHTML = tableHTML;
            

        }

     
    } catch (error) {
        console.error(error);
        // Handle the error as needed
    }
};


getAllProjects()

const deleteProject = (projectId: number) => {
    // Confirm the deletion with the user
    if (confirm('Are you sure you want to delete this project?')) {
        // Make an HTTP DELETE request to the server to delete the project
        fetch(`http://localhost:5000/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                // Add any necessary headers, such as authentication token
            }
        })
        .then(response => {
            if (response.ok) {
                // Handle successful deletion
                console.log(`Project with ID ${projectId} deleted successfully.`);
                // You may want to refresh the page or update the UI
            } else {
                // Handle deletion failure
                console.error('Failed to delete the project.');
            }
        })
        .catch(error => {
            // Handle errors
            console.error('An error occurred while deleting the project:', error);
        });
    }
};


const btns = document.querySelectorAll('.delete-button');
btns.forEach((element:any,index:number) => {
    console.log(element);
    
    element.addEventListener("click",()=>deleteProject(index))
});
