// Define a function to fetch user's project details
const fetchUserProjectDetails = async (user_id: string) => {  
    try {
      const response = await fetch(`http://localhost:5000/user/projects/${user_id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        
        },
      });
  
      if (response.ok) {
        const projectData = await response.json();
        const projectDetailsContainer = document.querySelector('.project-details-container') as HTMLElement;
  
        if (projectData.length === 0) {
          // No projects assigned to the user, show a red div
          const redDiv = document.createElement('div');
          redDiv.className = 'no-projects-div';
          redDiv.textContent = 'No projects assigned to you.';
          projectDetailsContainer.appendChild(redDiv);
        } else {
          // Populate project details in the table
          const table = document.createElement('table');
          const tbody = document.createElement('tbody');
  
          projectData.forEach((project:any) => {
            const row = document.createElement('tr');
  
            // Add project details to the table
            const headers = ['PROJECT NAME', 'STATUS', 'DESCRIPTION', 'CONTENT'];
            headers.forEach(header => {
              const headerCell = document.createElement('th');
              headerCell.textContent = header;
              row.appendChild(headerCell);
  
              const dataCell = document.createElement('td');
              dataCell.textContent = project[header.toLowerCase().replace(' ', '_')];
              row.appendChild(dataCell);
            });
  
            tbody.appendChild(row);
          });
  
          table.appendChild(tbody);
          projectDetailsContainer.appendChild(table);
        }
      } else {
        console.error('Failed to fetch project details.');
      }
    } catch (error) {
      console.error('An error occurred while fetching project details:', error);
    }
  };
  
 
  const user_id = localStorage.getItem('user_id') as string; // You might need to adjust this depending on your token storage method
  fetchUserProjectDetails(user_id);