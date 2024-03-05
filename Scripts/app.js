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
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const aboutStoreDesc = document.querySelector("#aboutStoreDesc");
const aboutImg = document.querySelector("#aboutImg");
const aboutTitle = document.querySelector("#aboutTitle");
const aboutContainerr = document.querySelector("#aboutContainerr");


const aboutRef = ref(db, "aboutStore");

onValue(aboutRef, (snapshot) => {
    const aboutData = snapshot.val();
    const aboutEntries = Object.entries(aboutData);
    console.log(aboutEntries);
    const aboutNewData = aboutEntries.map((item, index) => {
        return ` <div class="about-container">
        <div class="left">
        <h1 id="aboutTitle">${item[1].title ? item[1].title : "About Store"}</h1>
        <p class="title" id="aboutStoreDesc">${item[1].bookDesc ? item[1].bookDesc : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>
    </div>
    <div class="right">
        <img id="aboutImg" src="${item[1].bookImgUrl ? item[1].bookImgUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgG2yeJZ1pEHfgE9XkH0DoGVvTGYbaIJX_BA&usqp=CAU"}" alt="book2" style="object-fit:cover; " width="250px">
    </div>
    </div>`
    }).join("");

    aboutContainerr.innerHTML = aboutNewData;

});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



