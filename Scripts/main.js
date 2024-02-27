
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


adminSearchBtn.addEventListener("click", function () {
    const searchInputValue = adminSearchInput.value; //inputa yazdigimiz deyeri tutduq


    const myPromise = fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputValue}`);

    myPromise.then((res) => {
        const dataPromise = res.json();
        return dataPromise;
    })
        .then((data) => {
            renderBooks(data);
        })
        .catch((err) => {
            console.log(err);
        })

});

function renderBooks(bookData) {
    console.log("bookData--", bookData);
    const arrData = Object.entries(bookData);
    const a = arrData[2];
    const b = a[1];
    const c = b[0];
    const cArr = Object.entries(c);
    console.log(cArr);
    const newArr = cArr.map((item) => {
        return item.title;
    }).join("");
    console.log(newArr);
}













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

