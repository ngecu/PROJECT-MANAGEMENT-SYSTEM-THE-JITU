const viewProject = document.querySelector(".view-button");
const projects = document.querySelector(".all-projects");
const hideableContent = document.querySelector(".hideablecontent");
const closeBtn = document.querySelector(".btnclose"); // Assuming this is the close button

viewProject.addEventListener("click", (e) => {
  projects.style.display = "none";
  hideableContent.style.display = "block";
});

closeBtn.addEventListener("click", (e) => {
  projects.style.display = "flex";
  hideableContent.style.display = "none";
});
