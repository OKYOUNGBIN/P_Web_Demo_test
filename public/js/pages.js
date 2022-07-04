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
