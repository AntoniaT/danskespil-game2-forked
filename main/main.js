window.addEventListener("DOMContentLoaded", init);

// make buttons on the landing page to links
function init(){
    document.querySelector('.introBtn').addEventListener('click', () => {
        location.href = "blue_form/form.html";

    })
    document.querySelector('.otherGamesBtn').addEventListener('click', () =>{
        location.href = '../main/spillejhornet.html';
    })

}

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
