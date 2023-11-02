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


        if (data.projects == "No Projects") {
            all_tbody2.innerHTML = "";
            all_tbody2.innerHTML = no_data_tr;
        }
        else{
            let tableHTML = '';
                        data.forEach((element, index) => {
                            console.log(element);
                            
                tableHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${element.title}</td> <!-- Replace 'projectName' with the actual property name in your data -->
                        <td>${element.status}</td>
                        <td>${element.user_id}</td>
                        <td>
                            <button onclick="editProject(${index})">Edit</button>
                            <button onclick="deleteProject(${index})">Delete</button>
                        </td>
                    </tr>
                `;
            });
            
            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = tableHTML; // Set the innerHTML of the table body
            

        }

     
    } catch (error) {
        console.error(error);
        // Handle the error as needed
    }
};


getAllProjects()