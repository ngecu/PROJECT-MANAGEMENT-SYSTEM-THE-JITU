

// Define a function to fetch and display project details
const fetchAndDisplayProjectDetails = (projectId: number) => {
    const token = localStorage.getItem('token'); // Adjust based on your token handling

    if (!token) {
        console.error('User token not found.');
        return;
    }

    // Make a fetch request to get project details
    fetch(`http://localhost:5000/project/${projectId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'token': token,
        },
    })
    .then(res => res.json())
    .then(data => {
        const projectDetails = data; // Replace with the actual data structure

        // Populate project details in the HTML structure
        const projectNameElement = document.getElementById('project-name');
        const statusElement = document.getElementById('status');
        const descriptionElement = document.getElementById('description');
        const contentElement = document.getElementById('content');

        if (projectNameElement && statusElement && descriptionElement && contentElement) {
            projectNameElement.textContent = projectDetails.title;
            statusElement.textContent = projectDetails.status;
            descriptionElement.textContent = projectDetails.description;
            contentElement.textContent = projectDetails.content;
        }
    })
    .catch(error => {
        console.error('An error occurred while fetching project details:', error);
    });
}


// Get the project ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const projectIdParam = urlParams.get('project');

if (projectIdParam) {
    const projectId = parseInt(projectIdParam);

    // Call the function with the extracted project ID
    fetchAndDisplayProjectDetails(projectId);
} else {
    console.error('Project ID not found in the URL.');
}