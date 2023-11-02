// const { log } = require("console");

// const { log } = require("console");

const hideProjectBody = document.querySelector("#remove");
const hideableContent = document.querySelector("#hideable-content");
const formproject = document.getElementById("project_edit");
const saveChangesBtn = document.getElementById("saveChangesBtn");
const cancelChangeBtn = document.getElementById("cancelEdit");

cancelChangeBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

saveChangesBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const projectName = document.querySelector('input[type="text"]').value;
  const projectDescription = document.querySelector("textarea").value;
  const projectStatus = document.querySelector('input[type="text"]').value;

  if (projectName.trim() === "" && projectDescription.trim() === "") {
    console.log("You cannot save empty changes");
  } else {
    console.log("Project Name:", projectName);
    console.log("Project Description:", projectDescription);
    console.log("Project Status:", projectStatus);
  }

  console.log("Project Name:", projectName);
  console.log("Project Description:", projectDescription);
  console.log("Project Status:", projectStatus);
});

hideProjectBody.addEventListener("click", (e) => {
  if (hideProjectBody.value === "-") {
    hideableContent.style.display = "none";
    hideProjectBody.value = "+";
  } else {
    hideableContent.style.display = "flex";
    hideProjectBody.value = "-";
  }
});
