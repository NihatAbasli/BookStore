let hamburgerIcon = document.querySelector("#hamburgerIcon");
let close = document.querySelector(".adminLeftCross");
let Sidebar = document.querySelector(".responsiveSidebar");
let bg1 = document.querySelector(".bg1");

hamburgerIcon.addEventListener("click", function () {
  Sidebar.classList.add("active");
  bg1.classList.add("active");
});

close.addEventListener("click", () => {
  Sidebar.classList.remove("active");
  bg1.classList.remove("active");
});
