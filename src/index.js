import "./styles.css";
import "babel-core/register";
import "babel-polyfill";

let favoritesArray = [];
let readingListArray = [];
let completedArray = [];



let accordion = document.querySelectorAll(".accordion");

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", (event) => {
        let button = event.target
        button.classList.toggle("active");
        let panel = button.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

const search = async () => {
    let query = document.querySelector('#searchText').value;
    if (query != '') {
        fetch(`https://openlibrary.org/search.json?q=${query}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let resultsElement = document.querySelector('#searchResults');
                resultsElement.innerHTML = "";
                data.docs.forEach(element => {
                    let d = document.createElement("div");
                    d.className = "searchResult";
                    d.setAttribute("bookKey", element.key)
                    d.setAttribute("bookTitle", element.title)
                    d.setAttribute("bookAuthor", element.author_name)
                    d.innerHTML =
                        `<h4>${element.title}</h4>
                        <p>${element.author_name}</p>
                      <div class="buttonGroup">
                      <button class="addFavoriteButton addButton">Add to Favorites</button>
                      <button class="addListButton addButton">Add to reading list</button>
                        <button class="addCompleteButton addButton">Add to completed list</button>
                      </div>
                        </div>
                `
                    resultsElement.appendChild(d)
                });
            }).then(
                (data) => {
                    let favorites = document.querySelector("#favorites");
                    let readingList = document.querySelector("#readingList");
                    let completedList = document.querySelector("#completedList");



                    document.querySelectorAll(".addFavoriteButton").forEach((element) => {
                        element.addEventListener('click', (event) => {
                            let element = event.target.parentElement.parentElement
                            let bookKey = element.getAttribute("bookKey");
                            let bookTitle = element.getAttribute("bookTitle");
                            let bookAuthor = element.getAttribute("bookAuthor");


                            if (!favoritesArray.find(({
                                    key
                                }) => key === bookKey)) {


                                favoritesArray.push({
                                    "key": bookKey,
                                    "title": bookTitle,
                                    "author": bookAuthor
                                })

                                let d = document.createElement("div");
                                d.className = "searchResult";
                                d.setAttribute("key", bookKey)
                                d.innerHTML = `
                                    <h4>${bookTitle}</h4>
                                    <p>${bookAuthor}</p>
                                    `;
                                favorites.appendChild(d);
                            }
                        })
                    })


                    document.querySelectorAll(".addListButton").forEach((element) => {
                        element.addEventListener('click', (event) => {
                            let element = event.target.parentElement.parentElement
                            let bookKey = element.getAttribute("bookKey");
                            let bookTitle = element.getAttribute("bookTitle");
                            let bookAuthor = element.getAttribute("bookAuthor");

                            if (!readingListArray.find(({
                                    key
                                }) => key === bookKey)) {


                                readingListArray.push({
                                    "key": bookKey,
                                    "title": bookTitle,
                                    "author": bookAuthor
                                })

                                let d = document.createElement("div");
                                d.className = "searchResult";
                                d.setAttribute("key", bookKey)
                                d.innerHTML = `
                                        <h4>${bookTitle}</h4>
                                        <p>${bookAuthor}</p>
                                        
                                        `;
                                readingList.appendChild(d);
                            }
                        })
                    })
                    document.querySelectorAll(".addCompleteButton").forEach((element) => {
                        element.addEventListener('click', (event) => {
                            let element = event.target.parentElement.parentElement
                            let bookKey = element.getAttribute("bookKey");
                            let bookTitle = element.getAttribute("bookTitle");
                            let bookAuthor = element.getAttribute("bookAuthor");

                            if (!completedArray.find(({
                                    key
                                }) => key === bookKey)) {


                                completedArray.push({
                                    "key": bookKey,
                                    "title": bookTitle,
                                    "author": bookAuthor
                                })

                                let d = document.createElement("div");
                                d.className = "searchResult";
                                d.setAttribute("key", bookKey)
                                d.innerHTML = `
                                        <h4>${bookTitle}</h4>
                                        <p>${bookAuthor}</p>
                                       
                                        <div class="star-rating">
                                        <div class="star-rating__wrap">
                                            <input class="star-rating__input" id="star-rating-5" type="radio" name="rating" value="5">
                                            <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-5" title="5 out of 5 stars"></label>
                                            <input class="star-rating__input" id="star-rating-4" type="radio" name="rating" value="4">
                                            <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-4" title="4 out of 5 stars"></label>
                                            <input class="star-rating__input" id="star-rating-3" type="radio" name="rating" value="3">
                                            <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-3" title="3 out of 5 stars"></label>
                                            <input class="star-rating__input" id="star-rating-2" type="radio" name="rating" value="2">
                                            <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-2" title="2 out of 5 stars"></label>
                                            <input class="star-rating__input" id="star-rating-1" type="radio" name="rating" value="1">
                                            <label class="star-rating__ico fa fa-star-o fa-lg" for="star-rating-1" title="1 out of 5 stars"></label>
                                        </div>
                                        </div>
                                       
                                        `;
                                completedList.appendChild(d);
                            }
                        })
                    })

                }
            )
            .catch((err) => {
                console.log('Something went wrong!', err);
                alert('Please double check your search query!');
            });
    }
}




document.querySelector(`#search`).addEventListener('click', (event) => {
    console.log("stuff")
    search();
    event.preventDefault();
})
document.querySelector(`#searchText`).addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        console.log("stuff")
        search();
        event.preventDefault();
    }
})