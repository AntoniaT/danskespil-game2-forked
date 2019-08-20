window.addEventListener("DOMContentLoaded", init);

// make buttons on the landing page to links
function init(){
    loadWelcomeSvg();
    updateUserName();

    document.querySelector('.introBtn').addEventListener('click', () => {
        location.href = "../blue_form/form.html";

    })
    document.querySelector('.otherGamesBtn').addEventListener('click', () =>{
        location.href = '../main/spillejhornet.html';
    })
}
// update the points and username from local storage on the welcome section
function updatePoints(){
    const points = localStorage.getItem("sp.counter");
    document.querySelector("[data-set=pointsDisplay]").textContent = points + " points";

}
function updateUserName(){
    const username = JSON.parse(localStorage.getItem("sp.user"));
    console.log(username.name);
    document.querySelector("#userName").textContent = username.name;

  }
// load the medal svg onto page
function loadWelcomeSvg(svgData){
    console.log("load the SVG");
    updatePoints();
    fetch("../images/Winner-icon.svg")
    .then( response => response.text() )
    .then( svgData => {
        console.log("SVG loaded");
        document.querySelector("#welcomeImg").insertAdjacentHTML("afterbegin", svgData);

    })}


// create the burger menu for the mobile version
const menuBtn = document.querySelector(".menuBtn");


menuBtn.addEventListener("click", openNav);

function openNav() {
//  document.querySelector(".upperMobileNav").classList.remove = "hidden";
//  document.querySelector("#mobileNav.overlay").classList.remove = "hidden";
  document.getElementById("mobileNav").style.height = "80%";
  document.querySelector(".menuBtn").style.display = "none";
}

function closeNav() {
  document.getElementById("mobileNav").style.height = "0%";
  document.querySelector(".menuBtn").style.display = "block";

}


