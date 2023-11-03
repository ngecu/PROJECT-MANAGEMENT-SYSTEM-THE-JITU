
const getAllUsers = async () => {
    try {
        const response = await fetch('http://localhost:5000/user/allUsers', {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: 'GET',
        });

        const data = await response.json();
        // console.log(data);


        const no_data_tr = `<tr class="no-data-row">
        <td colspan="5">No Users</td>
    </tr>
    `


        if (data.projects == "No Users") {
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
                        <td>${element.first_name}</td> <!-- Replace 'projectName' with the actual property name in your data -->
                        <td>${element.last_name}</td>
                        <td>${element.email}</td>
                        <td>${element.role}</td>

                        <td>
                            <button class="edit-button" onclick="editProject(${index})">Edit</button>
                            <button class="delete-button" onclick="deleteProject(${index})">Delete</button>
                        </td>
                    </tr>
                `;
            });
            
            // const tableBody = document.querySelector('table tbody');
const all_tbody4 = document.querySelector('tbody') as HTMLDivElement;

all_tbody4.innerHTML = tableHTML; // Set the innerHTML of the table body
            

        }

     
    } catch (error) {
        console.error(error);
        // Handle the error as needed
    }
};


getAllUsers()