
// Firebase qosulmasi>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCkKjkJqewfUsthtddoSgbLpHUUZuhf8EE",
    authDomain: "bookstore-ba52d.firebaseapp.com",
    databaseURL: "https://bookstore-ba52d-default-rtdb.firebaseio.com",
    projectId: "bookstore-ba52d",
    storageBucket: "bookstore-ba52d.appspot.com",
    messagingSenderId: "58818927923",
    appId: "1:58818927923:web:26328e04b3b40f9fcf3246"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ADD BOOKS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let adminSearchInput = document.querySelector("#adminSearchInput");
let adminSearchBtn = document.querySelector("#adminSearchBtn");
let history = document.querySelector("#history");

// BookForm
const nameInput = document.querySelector("#nameInput");
const authorInput = document.querySelector("#authorInput");
const urlInput = document.querySelector("#urlInput");
const descInput = document.querySelector("#descInput");
const typeInput = document.querySelector("#typeInput");

//bu funksuiya axtaris bolmesine aiddir
function getSuggestion() {

    const searchValue = adminSearchInput.value;
    const myPromise = fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`);
    myPromise.then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.items);

        data.items.forEach((item, index) => {
            const bookTitle = item.volumeInfo.title;
            // console.log(bookTitle);
            let suggestionItem = `<li class="suggestEl">
                <img src="../Assets/Icon/clock.svg" alt="">
                <p>${bookTitle}</p>
            </li>`
            history.innerHTML += suggestionItem;


            document.querySelectorAll("#history").forEach((el, index) => {
                el.addEventListener("click", () => {
                console.log(salam);
            })
            });


    })
})
        .catch ((err) => {
    console.log(err);
})


}


adminSearchInput.addEventListener("input", function () {
    getSuggestion();
})



















// Firebase qosulmasi ENDDDD>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>





























// Join Us Modal Homne Page
let bgDark = document.querySelector(".bgDark");
let joinModal = document.querySelector(".joinModal");
let joinBtn = document.querySelector("#joinBtn");

// joinBtn.addEventListener("click", function () {
//     joinModal.classList.add("exit");
//     bgDark.classList.add("show");
// });

// bgDark.addEventListener("click", function () {
//     joinModal.classList.remove("exit");
//     bgDark.classList.remove("show");
// });

// Home Page Hamburger 
let hamburger = document.querySelector(".hamburger");
let linkContentModal = document.querySelector(".linkContentModal");
let homeModalCross = document.querySelector(".homeModalCross");

// hamburger.addEventListener("click", function () {
//     linkContentModal.classList.add("showModalHome");

// });

// homeModalCross.addEventListener("click", function () {
//     linkContentModal.classList.remove("showModalHome");

// })
// Home Page Hamburger end>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

