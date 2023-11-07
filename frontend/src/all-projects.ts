async function deleteProject(projectId: number) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this project?"
  );

  if (confirmDelete) {
    try {
      const response = await fetch(
        `http://localhost:5000/project/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Project deleted successfully");
        // Optionally, you can update the project list here if needed.
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("An error occurred while deleting the project:", error);
    }
  }
}

const getAllProjects = async () => {
  try {
    const response = await fetch("http://localhost:5000/project/allProjects", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "GET",
    });

    const data = await response.json();

    console.log(data);

    // console.log(data);
    const all_tbody2 = document.querySelector(
      ".all_tbody2"
    ) as HTMLTableElement;

    const no_data_tr = `<tr class="no-data-row">
        <td colspan="5">No Projects</td>
    </tr>
    `;

    if (data.length == 0) {
      all_tbody2.innerHTML = "";
      all_tbody2.innerHTML = no_data_tr;
    } else {
      let tableHTML = "";
      data.forEach((element: any, index: number) => {
        tableHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${element.project_name}</td>
                        <td>${element.project_status}</td>
                        <td>${element.first_name} ${element.last_name}</td>
                        <td>
                            <a href="project.html?project=${
                              element.project_id
                            }" class="view-button">View</a>
                            <a href="edit_project.html?project=${
                              element.project_id
                            }" class="Edit-button">Edit</a>
                            <button class="delete-button">Delete</button>
                        </td>
                    </tr>
                `;
      });

      const tableBody = document.querySelector("table tbody") as HTMLElement;
      tableBody.innerHTML = tableHTML;

      // Add event listeners to delete buttons
      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          const projectId = data[index].project_id;
          deleteProject(projectId);
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};

getAllProjects();
