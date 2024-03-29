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


// Join Us Modal Homne Page
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

// Home Page Hamburger 
let hamburger = document.querySelector(".hamburger");
let linkContentModal = document.querySelector(".linkContentModal");
let homeModalCross = document.querySelector(".homeModalCross");

hamburger.addEventListener("click", function () {
    linkContentModal.classList.add("showModalHome");

});

homeModalCross.addEventListener("click", function () {
    linkContentModal.classList.remove("showModalHome");
});

const joinName = document.querySelector("#joinName");
const joinEmail = document.querySelector("#joinEmail");
const joinModalButton = document.querySelector("#joinModalButton");
const joinUsTbody = document.querySelector("#joinUsTbody");


document.addEventListener("DOMContentLoaded", function () {
    joinModalButton?.addEventListener("click", function () {
        push(ref(db, "joinUs"), {
            fullName: joinName.value,
            email: joinEmail.value
        }).then(() => {
            alert("Add Successfully");
            joinName.value = "";
            joinEmail.value = "";
        });
    });
})


// About Store Page start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const aboutStoreDesc = document.querySelector("#aboutStoreDesc");
const aboutImg = document.querySelector("#aboutImg");
const aboutTitle = document.querySelector("#aboutTitle");
const aboutContainerr = document.querySelector("#aboutContainerr");


const aboutRef = ref(db, "aboutStore");

onValue(aboutRef, (snapshot) => {
    const aboutData = snapshot.val();
    const aboutEntries = Object.entries(aboutData);
    // console.log(aboutEntries);
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

// About Store Page end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// Contact us Page start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const contactName = document.querySelector("#contactName");
const contactEmail = document.querySelector("#contactEmail");
const contactAddress = document.querySelector("#contactAddress");
const contactPhone = document.querySelector("#contactPhone");
const contactBtn = document.querySelector("#contactBtn");

contactBtn?.addEventListener("click", function () {
    const contactData = {
        name: contactName.value,
        email: contactEmail.value,
        address: contactAddress.value,
        phone: contactPhone.value
    }
    push(ref(db, "contactUs"), contactData)
        .then(() => {
            alert("Contact information successfully push")
            contactName.value = "",
                contactEmail.value = "",
                contactAddress.value = "",
                contactPhone.value = ""
        });
});

// Contact us Page end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const booksAboutRef = ref(db, "books");

onValue(booksAboutRef, (snapshoot) => {
    const booksData = snapshoot.val();
    const newBooksData = Object.entries(booksData);
    // console.log("newwdataaa", newBooksData);
    const renderBooksAbout = newBooksData.map((item, index) => {
        return `<button id="typeBtn" class="cBtn"><a href="#">${item[1].type}</a></button>`
    }).join("");


    document.querySelector(".btnsCatalog").innerHTML = renderBooksAbout;
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const typeBtn = document.querySelector("#typeBtn");
// typeBtn.addEventListener("click",function(){
//     console.log("kkkk");
// })


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const catalogRef = ref(db, "books");
onValue(catalogRef, (catalogFunc) => {
    const catalogData = catalogFunc.val();
    const newCatalog = Object.entries(catalogData);
    console.log("newCatalog ", catalogData);
    const catalogRender = newCatalog.map((el, count1) => {
        // console.log("ellll ", el[1].type);

        // return `<li><a href="#">${el[1].type}</a></li>`;

        return `<button data-typee="${el[1].type}" class="listBtn">${el[1].type}</button>`;

    }).join("");

    document.querySelector(".bookTypeRender").innerHTML = catalogRender;


    const listBtn = document.querySelectorAll(".listBtn");
    listBtn.forEach((el5, count5) => {
        const listType = el5.dataset.typee;
        el5.addEventListener("click", function () {
            const filterType = newCatalog.filter((item) => {
                return item[1].type == listType;
            });
            // console.log(filterType[0][1].type);
            const itemType = filterType[0][1];
            const renderType = `<div class="swiper-slide">
            <div class="book-about" >                 
                <img src="${itemType.imageUrl}" alt="book">
                <p class="name">${itemType.title}</p>
                <p class="author">${itemType.author}</p>
                <button class="readMoreBtn">Read more</button>                
            </div>
        </div>`
            document.querySelector("#booksSileder").innerHTML = renderType;
        });
    });
});




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


const silederRef = ref(db, "books");
onValue(silederRef, (silederBook) => {
    const silederData = silederBook.val();
    const silederNewData = Object.entries(silederData);
    // console.log("silederdata ", silederNewData);

    const renderSileder = silederNewData.map((element) => {
        return `<div class="swiper-slide">
                <div class="book-about" > 
                <img src="${element[1].imageUrl ? element[1].imageUrl : "https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_640.jpg"}" alt="book" height="220px">
                <p class="name">${(element[1].author ? element[1].author : "Anonim").substring(0, 15)}</p>
                <p class="author">${(element[1].title ? element[1].title : "Anonim").substring(0, 15)}</p>
                <button data-type-name="${element[1].type}" class="readMoreBtn">Read more</button>
                </div>
                    </div>`
    }).join("");

    document.querySelector("#booksSileder").innerHTML = renderSileder;

    //BOOK PAGE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const bookPageStart = document.querySelector("#bookPageStart");
    const readMoreBtn = document.querySelectorAll(".readMoreBtn");
    const catalogStart = document.querySelector("#catalogStart");

    // console.log(readMoreBtn.dataset.typeName);
    readMoreBtn.forEach((item, index) => {
        const btnType = item.dataset.typeName;
        item.addEventListener("click", function () {
            console.log(btnType);
            const bookFilter = silederNewData.filter((books) => {
                // console.log("books ", books[1].type);
                return books[1].type == btnType;
            });
            catalogStart.style.display = "none";
            bookPageStart.style.display = "block";

            console.log("bookFilter", bookFilter);
            // console.log("item",item);

            const itemsBook = bookFilter[0][1];

            const renderFilterBooks = `<div class="pageLeft">
            <button id="backBtn" onclick="history.back()" class="backButton"> &#60;Back</button>
            <button class="year">2017</button>
            <div class="bookName">${itemsBook.title}</div>
            <div class="time">2 days ago added</div>
            <div class="author">${itemsBook.author}</div>
            <div class="title">
            ${itemsBook.description}
            </div>
        </div>

        <div class="pageRight">
            <img src="${itemsBook.imageUrl}" alt="book" width="90%">
        </div>`;

            document.querySelector(".bookPage").innerHTML = renderFilterBooks;

        })

    })


});





//search page inputunu tutmaq

const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector("#searchBtn");
const bookAboutContent = document.querySelector(".bookAboutContent");


function searchPageRender() {
    const promise = fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}`);
    promise.then((res) => {
        return res.json();
    }).then((data) => {
        // console.log("data ", data);
        // console.log("data items ", data.items);
        // console.log("data ", data.items[0]);
        const dataEnter = data.items[0].volumeInfo;
        const renderSearch = ` <div class="searchbookImg">
                <img src="${dataEnter.imageLinks.smallThumbnail}" width="190px">
            </div>
            <div class="searchBookContent">
                <div class="searchBookName">${dataEnter.title}</div>
                <div class="searchBookAuthor">${dataEnter.authors}</div>
                <div class="searchBookText">
                ${dataEnter.description}
                </div>
            </div>`
        bookAboutContent.innerHTML = renderSearch;

    }).catch((err) => {
        console.log("then Error");
    });
    searchInput.value = "";
}

searchBtn?.addEventListener("click", function () {
    searchPageRender();
});



//Comment Part>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const baseUrl = "https://blog-api-t6u0.onrender.com";

const getPost = async () => {
    try {
        const response = await fetch(baseUrl + "/posts", {
            method: "GET"
        });
        const data = await response.json();
        // console.log("data ", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
}

// getPost();

const postMethod = async (form) => {
    try {
        const response = await fetch(baseUrl + "/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

// postMethod({ title: "yorummm", body: "hjfdgdjgv" });

const inputCommet = document.querySelector(".inputCommet");
const sendBtn = document.querySelector("#sendBtn");


async function renderPosts() {
    try {

        sendBtn.addEventListener("click", function () {
            const commentValue = inputCommet.value;
            postMethod({ title: commentValue });
            // console.log(commentValue);
            inputCommet.value = "";
        });

        const dataRender = await getPost();

        const filterDataRender = dataRender.filter((comment) => {
            return comment.id > 100;
        });

        const commentData = filterDataRender.reverse().map((item, index) => {
            return `<div class="textTop">
            <div class="userName">Anonim</div>
            <div class="dateUser">18:32 today</div>
        </div>
        <div class="textArea">
            ${item.title}
        </div>`
        }).join("");


        document.querySelector(".commentText").innerHTML = commentData;



    } catch (error) {
        console.log(error);
    }
}


renderPosts();

