// define program constants
const DEFAULT_LIST_NAME = "THINGS TO DO";

// store user data
var data = [];

// display current year
$("#year").text(new Date().getFullYear());

// display random joke
(async function request() {
    const response = await fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single").then(res=> {
        return res.json();
    });
    $("#joke").text("Programming Joke: " + response.joke);
})();

// get user data
function getUserData() {

    // update list name
    let list_name = localStorage.getItem("title");
    if (list_name == null) {
        $("#listName").text(DEFAULT_LIST_NAME);
    }
    else {
        $("#listName").text(localStorage.getItem("title"));
    }

    // get list items
    let user_data = JSON.parse(localStorage.getItem("data"));

    // update list items
    if (user_data != []) {

        for (item of user_data) {

            let li = document.createElement("li");
            li.innerHTML = item;
            document.getElementById("thingList").appendChild(li);

            let span = document.createElement("SPAN");
            let txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);
            data.push(li.innerText.split("\n")[0])

            for (i = 0; i < close.length; i++) {
                close[i].onclick = function() {
                    let div = this.parentElement;
                    for (let x = 0; x < data.length; x++){
                        if (data[x] === div.innerText.split("\n")[0]) {
                            data.splice(x, 1);
                        }
                    }
                    div.remove();
                }
            }

            getListState(li)

        }

    }

}

// get list state
function getListState(item) {
    let states = new Map(JSON.parse(localStorage.states));
    if (states.get(item.innerText.split("\n")[0]) === true) {
        item.classList.toggle('checked');
    }
}

// save list state
function saveListState() {
    let states = new Map();
    for (item of $("li")) {
        if (item.classList.contains("checked")) {
            states.set(item.innerText.split("\n")[0], true);
        }
        else {
            states.set(item.innerText.split("\n")[0], false);
        }
    }
    return states;
}

// save user data
function saveUserData() {
    localStorage.states = JSON.stringify(Array.from(saveListState().entries()));
    localStorage.setItem("data", JSON.stringify(data));
}

// create list item
function createListItem() {

    // create list item
    let li = document.createElement("li");
    let inputValue = $("#inputTextbox").val();
    let t = document.createTextNode(inputValue);
    li.appendChild(t);

    // check user input
    if (inputValue.trim() === '') {
        alert("An error occurred. Please enter something.");
    }
    else if (data.includes(inputValue)) {
        alert("An error occurred. This task already exists.");
    }
    else {

        // update to-do list
        $("#thingList").append(li);

        // create item settings
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        data.push(li.innerText.split("\n")[0])

        // check item settings
        for (i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                let div = this.parentElement;
                for (let x = 0; x < data.length; x++){
                    if (data[x] === div.innerText.split("\n")[0]) {
                        data.splice(x, 1);
                    }
                }
                div.remove();
            }
        }

    }

    // reset input textbox
    $("#inputTextbox").val("");

}

// change list title
document.getElementById("listName").addEventListener("input", function() {
    let list_name = document.getElementById("listName").innerText;
    if (list_name.trim() != "") {
        localStorage.setItem("title", document.getElementById("listName").innerText);
    }
    else {
        alert("An error occurred. Please enter something.");
        document.getElementById("listName").innerHTML = DEFAULT_LIST_NAME;
        localStorage.setItem("title", document.getElementById("listName").innerText);
    }
}, false);

// update list state
let list = document.querySelector('ul');
list.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    }
}, false);

// delete list item
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        let div = this.parentElement;
        for (let x = 0; x < data.length; x++){
            if (data[x] === div.innerText.split("\n")[0]) {
                data.splice(x, 1);
            }
        }
        div.remove();
    }
}

// avoid form resubmission
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}