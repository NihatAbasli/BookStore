// Firebase qosulmasi>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
            const bookSelect = item.volumeInfo;
            const bookTitle = item.volumeInfo.title;
            // console.log(bookTitle);
            let suggestionItem = `<li>
                <img src="../Assets/Icon/clock.svg" alt="">
                <p class="suggestText">${bookTitle}</p>
            </li>`
            history.innerHTML += suggestionItem;

            document.querySelector(".historyContent").classList.add("historyActive");

            const suggestText = document.querySelectorAll(".suggestText");
            suggestText.forEach((el, count) => {
                el.addEventListener("click", function () {
                    nameInput.value = data.items[count].volumeInfo.title;
                    authorInput.value = data.items[count].volumeInfo.authors;
                    urlInput.value = data.items[count].volumeInfo.imageLinks.smallThumbnail;
                    descInput.value = data.items[count].volumeInfo.description;
                    typeInput.value = data.items[count].volumeInfo.categories;
                })
            })

        });

    })
        .catch((err) => {
            console.log(err);
        })
};

adminSearchInput.addEventListener("input", function () {
    getSuggestion();
});


const formBtn = document.querySelector("#formBtn");

document.addEventListener("DOMContentLoaded", function () {
    formBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (
            nameInput.value == "" ||
            authorInput.value == "" ||
            urlInput.value == "" ||
            descInput.value == "" ||
            typeInput.value == ""
        ) {
            alert("Please enter inputs");
            return;
        }

        push(ref(db, "books"), {
            title: nameInput.value,
            author: authorInput.value,
            imageUrl: urlInput.value,
            description: descInput.value,
            type: typeInput.value,
        }).then(() => {
            alert("Push successfully");
            (nameInput.value = "");
            (authorInput.value = "");
            (urlInput.value = "");
            (descInput.value = "");
            (typeInput.value = "");
            window.location.reload();
        })
    })
});
// function writePush(collection, data) {
//     const colRef = ref(db, collection);
//     push(colRef, data);
// }

// Make Books table>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const booksRef = ref(db, 'books');
onValue(booksRef, (snapshot) => {
    const data = snapshot.val();
    const entrData = Object.entries(data);
    console.log(entrData);
    const booksTableBody = document.querySelector("#booksTableBody")
    const renderBooks = entrData.map((item, index) => {
        return `<tr>
                    <td>${index + 1}</td>
                    <td><img class="imgMiddle" src=${item[1].imageUrl}
                    alt="bookImg" width="30px">${item[1].title}</td>
                    <td>Interesting Book</td>
                    <td>${item[1].type}</td>
                    <td>${item[1].author}</td>
                 </tr>`
    }).join("");
    booksTableBody.innerHTML = renderBooks;
});

// About Store AdminPage
const aboutInfoBtn = document.querySelector("#aboutInfoBtn");
const aboutInput = document.querySelector("#aboutInput");
const aboutText = document.querySelector("#aboutText");
const aboutTextarea = document.querySelector("#aboutTextarea");


aboutInfoBtn.addEventListener("click", function (e) {
    e.preventDefault();
    push(ref(db, "aboutStore"), {
        title: aboutInput.value,
        bookImgUrl: aboutText.value,
        bookDesc: aboutTextarea.value
    }).then(() => {
        alert("Information push Successfully");
        aboutInput.value = "";
        aboutText.value = "";
        aboutTextarea.value = "";
        window.location.reload();
    })
});




getSuggestion();



























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

