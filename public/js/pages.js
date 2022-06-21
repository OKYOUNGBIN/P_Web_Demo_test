const tabs = document.querySelectorAll("[data-tab-target]");
const tabcon = document.querySelectorAll("[data-tab-content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabcon.forEach((tabc_all) => {
      tabc_all.classList.remove("active");
    });
    target.classList.add("active");
  });
});

// const sidebar = document.getElementById("nav")
// const buttonClick = document.getElementById("bottom_content")
// buttonClick.addEventListener("click", sidebarHideShow)
// function sidebarHideShow(){
//   if(sidebar.style.display == "block") {
//     sidebar.style.display = "none";
//   }else{
//     sidebar.style.display = "block";
//   }
// }
