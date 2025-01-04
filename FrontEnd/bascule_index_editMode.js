
let div_noir = document.getElementById("edit-mode-div-noir");
let token = localStorage.getItem("tokenvalue");
let logout = document.getElementById("lien-logout");
let popup = document.getElementById("popup");
let portfolio_edit = document.getElementById("portfolio");
let portfolio_index = document.getElementById("portfolio_1");


if(token === ""){ // déconnecté
    div_noir.style.display = "none";
    popup.style.display = "none";
    portfolio_edit.style.display = "none";
    logout.innerHTML = "login";
}

if (token != ""){ //connécté
    portfolio_index.style.display = "none";
}

