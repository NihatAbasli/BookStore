let bgDark = document.querySelector(".bgDark");
let joinModal = document.querySelector(".joinModal");
let joinBtn = document.querySelector("#joinBtn");

joinBtn.addEventListener("click", function () {
    joinModal.classList.add("exit");
    bgDark.classList.add("show");
});

bgDark.addEventListener("click", function () {
    joinModal.classList.remove("exit");
    bgDark.classList.remove("show");
});