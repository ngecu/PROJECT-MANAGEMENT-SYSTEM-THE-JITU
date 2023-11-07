// Define the types for project details
interface Project {
  project:Proje,
  user:User2
}

interface User2{
  assigned:boolean,
  email:string,
  first_name:string,
  last_name:string

}

interface Proje {
  project_id: number,
  project_name: string,
  user_id: number,
  project_description: string
}
// Function to fetch and populate project details
const populateProjectDetails = async (projectId: number) => {
  try {
    // Make an HTTP request to fetch the project details based on the project ID
    const response = await fetch(`http://localhost:5000/project/${projectId}`);
    const projectData: Project = await response.json();

    console.log(projectData);

    // Check if the project was found
    if (!projectData) {
      alert("No project found");
      return;
    }

    // Update the page title
    document.title = `Edit Project - ${projectData.project_name}`;

    // Populate form fields with project details
    const pnameInput = document.getElementById("pname") as HTMLInputElement;
    const userSelect = document.getElementById("user") as HTMLSelectElement;
    const pdescrInput = document.getElementById("pdescr") as HTMLInputElement;

    pnameInput.value = projectData.project.project_name;
    // userSelect.value = projectData.user_id.toString();
    pdescrInput.value = projectData.project.project_description;
  } catch (error) {
    console.error(error);
    // Handle errors as needed
  }
};

const queryString2 = window.location.search;
const urlParams2 = new URLSearchParams(queryString2);
const PROJECT_ID = urlParams2.get("project") as string;

if (PROJECT_ID) {
  populateProjectDetails(PROJECT_ID));
}

// Function to update a project
const updateProject = async (projectId: number, updatedProject: Project) => {
  try {
    const response = await fetch(`http://localhost:5000/project/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    });

    if (response.ok) {
      alert("Project updated successfully");
    } else {
      alert("Failed to update project");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while updating the project");
  }
};

// Function to handle form submission
const handleFormSubmit = (event: Event) => {
  event.preventDefault(); // Prevent default form submission

  // Get the updated project details from the form fields
  const projectId = parseInt(PROJECT_ID);
  const project_name = (document.getElementById("pname") as HTMLInputElement).value;
  const user_id = parseInt(
    (document.getElementById("user") as HTMLSelectElement).value
  );
  const project_description = (document.getElementById("pdescr") as HTMLInputElement)
    .value;

    const project : Proje = {
      project_name:"asdasdd"
    }
  // Create an object with the updated project details
  const updatedProject: Project = {
    project.project_name,
    user_id,
    project_description,
  };

  // Call the updateProject function to update the project
  updateProject(projectId, updatedProject);
};

// Add an event listener to the form for submission
const form = document.querySelector(".edit-project-form") as HTMLFormElement;
form.addEventListener("submit", handleFormSubmit);
