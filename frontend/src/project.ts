// Define a function to fetch and display project details
const fetchAndDisplayProjectDetails = (projectId: number) => {
  const token = localStorage.getItem("token"); // Adjust based on your token handling

  if (!token) {
    console.error("User token not found.");
    return;
  }

  // Make a fetch request to get project details
  fetch(`http://localhost:5000/project/${projectId}`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      token: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const projectDetails = data; // Replace with the actual data structure

      // Populate project details in the HTML structure
      const projectNameElement = document.getElementById(
        "project-name"
      ) as HTMLElement;
      const statusElement = document.getElementById("status") as HTMLElement;
      const descriptionElement = document.getElementById(
        "description"
      ) as HTMLElement;
      const dueDateElement = document.getElementById("due-date") as HTMLElement;
      const assignedToElement = document.getElementById(
        "assigned-to"
      ) as HTMLElement;
      const contentElement = document.getElementById("content") as HTMLElement;

      projectNameElement.innerHTML = projectDetails.project.project_name;
      statusElement.innerHTML = projectDetails.project.project_status;
      descriptionElement.innerHTML = projectDetails.project.project_description;
      dueDateElement.innerHTML = projectDetails.project.dueDate;
      assignedToElement.innerHTML = `${projectDetails.our_user.first_name} ${projectDetails.our_user.last_name}`;
      contentElement.innerHTML = projectDetails.content;
    })
    .catch((error) => {
      console.error("An error occurred while fetching project details:", error);
    });
};

// Get the project ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const projectIdParam = urlParams.get("project");

if (projectIdParam) {
  const projectId = projectIdParam;

  // Call the function with the extracted project ID
  fetchAndDisplayProjectDetails(projectId);
} else {
  console.error("Project ID not found in the URL.");
}
