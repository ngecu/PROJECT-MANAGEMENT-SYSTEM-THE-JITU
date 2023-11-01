const hideProjectBody = document.querySelector("#remove");
const hideableContent = document.querySelector("#hideable-content");
// const projectBody = document.querySelector(".project-body");

hideProjectBody.addEventListener("click", (e) => {
  if (hideProjectBody.value === "-") {
    hideableContent.style.display = "none";
    hideProjectBody.value = "+";
  } else {
    hideableContent.style.display = "flex";
    hideProjectBody.value = "-";
  }
});
