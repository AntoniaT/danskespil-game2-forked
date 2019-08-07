//loading DOM
window.addEventListener("DOMContentLoaded", loadSVG);

function loadSVG() {
  fetch("background1.svg")
    .then(response => response.text())
    .then(svgData => {
      document
        .querySelector("#gameplaceholder")
        .insertAdjacentHTML("beforeend", svgData);
    });
  loadModalOne();
}

function loadModalOne() {
  fetch("modals.svg")
    .then(response => response.text())
    .then(svgData => {
      document
        .querySelector("#startone")
        .insertAdjacentHTML("beforeend", svgData);
      //starting everything on click of the start
      document
        .querySelector("#startone")
        .addEventListener("click", loadModalTwo);
    });
}
function loadModalTwo() {
  document.querySelector("#startone").style.display = "none";
  document.querySelector("#starttwo").style.display = "block";
  fetch("modals2.svg")
    .then(response => response.text())
    .then(svgData => {
      document
        .querySelector("#starttwo")
        .insertAdjacentHTML("afterbegin", svgData);

      document.querySelector("#starttwo").addEventListener("click", gameStart);
    });
}

function gameStart() {
  document.querySelector("#starttwo").style.display = "none";
  document.querySelector("#blur2").style.display = "none";
  document.querySelector("#backgroundmodal").style.display = "none";
  console.log("greencup");
  //hiding the modal
  catching();
}

function catching() {
  let GoodCup = document.querySelector("#CupForCounting");
  let BadCup = document.querySelector("#badCup");
  let intv;
  let speed = 1000;
  let killedCups = [];
  let counter = 0;
  let timertodeath;

  //music on
  document.querySelector("#music").play();
  //enhancing speed and adding points on the Good Cup click
  GoodCup.addEventListener("click", () => {
    //points adding sound
    document.querySelector("#good").play();
    //here we are changing the text for pointer counter and the button and the end modal
    counter++;
    let pointCounter = document.querySelector("#pointstext");
    pointCounter.textContent = `${counter} points`;
    document.querySelector(
      "#congratulations"
    ).innerHTML = `You earned ${counter} points!<br\> Exchange them to ${counter *
      10}dkk now!`;
    document.querySelector("#formbutton").innerHTML = `Get your ${counter *
      10} dkk now!`;
    speed = speed - 80;
    //to speed up we have to clear the existing interval and turn it on again with the new speed
    clearInterval(intv);
    //turning the game with some timeout
    clearTimeout(timertodeath);
    timertodeath = setInterval(function() {
      let badstrike;
      killedCups.push(badstrike);
      let strikes = document.querySelectorAll("[data-id]");
      let properstrike = strikes[killedCups.length - 1];
      properstrike.style.fill = "red";
      document.querySelector("#bad").play();
      document.querySelector("#nope").play();
      if (killedCups.length === 3) {
        endGame(counter);
      }
      //endGame(counter);
    }, 40000);
    //the point appears
    document.querySelector("#onepoint").classList.add("animatingpoints");
    setTimeout(function() {
      document.querySelector("#onepoint").classList.remove("animatingpoints");
    }, 600);
    //if the counter is divisible by 3, we clone the BadCup all over and append it to the background
    if (counter % 3 === 0) {
      let clone = BadCup.cloneNode(true);
      document.querySelector("#backgroundGame").appendChild(clone);
      badCupFunctionality(killedCups, clone, counter);
    }
  });

  //value for setting the interval with a certain speed to the moving
  moveCup(GoodCup);
  timertodeath = setInterval(function() {
    let badstrike;
    killedCups.push(badstrike);
    let strikes = document.querySelectorAll("[data-id]");
    let properstrike = strikes[killedCups.length - 1];
    properstrike.style.fill = "red";
    document.querySelector("#bad").play();
    document.querySelector("#nope").play();
    if (killedCups.length === 3) {
      endGame(counter);
    }
  }, 40000);
  int = setInterval(moveCup, speed, GoodCup);
  //now introducing the bad cup
}

function moveCup(GoodCup) {
  // let GoodCup = document.querySelector("#CupForCounting");
  //so this is math random is multiplied but the width and height of the canvas
  //it's aproximately the width and height through which the cup should move
  //i tested it first moving the cup to the most left and most bottom in css
  GoodCup.style.transform = `translate(${Math.random() *
    1100}px, ${Math.random() * 400}px)`;
}

function badCupFunctionality(killedCups, clone, counter) {
  clone.style.display = "block";
  //I am reusing the same function for moving the cup but just with different values and one set speed
  setInterval(moveCup, 1000, clone);
  clone.addEventListener("click", () => {
    //instead of counting clicks we have to create the array and pushed every clicked clone into that. it's because
    //the counter gets reseted with every clone, because it is counting a click to this particular clone, not globally
    killedCups.push(clone);

    clone.querySelector("#thex").classList.add("animatingpoints");
    setTimeout(function() {
      clone.style.display = "none";
    }, 800);
    //bad points sound effect
    document.querySelector("#bad").play();
    document.querySelector("#nope").play();
    //here I am finding all the "x" in the svg, they have data id but it's just because I was playing with that, could
    //be just a class or whatever, anyway all of them are now an array of strikes and the index number of the array
    //should equal to the amount of the killed cups minus one. because index numbers of arrays start from 0 and number of
    //killed cups will be starting from 1
    let strikes = document.querySelectorAll("[data-id]");
    let properstrike = strikes[killedCups.length - 1];
    properstrike.style.fill = "red";
    //end the game when it's 3 clicked
    if (killedCups.length === 3) {
      endGame(counter);
    }
  });
}

function endGame(counter) {
  //also enough of the got music
  document.querySelector("#music").pause();
  document.querySelector("#blur").style.display = "block";
  document.querySelector("#endgamemodal").style.display = "block";
  //replay functionality
  document.querySelector("#replay").addEventListener("click", () => {
    location.reload();
  });
}

//ROTATE MOBILE SECTION

//Showing the rotateScreen div only on mobile devices
let mql = window.matchMedia("(max-width: 500px)");

function screenTest(e) {
  if (e.matches) {
    /* the viewport is 500 pixels wide or less */
    //for mobile device
    document.querySelector("#startone").style.display = "none";
    document.querySelector("#rotateScreen").style.display = "block";
  } else {
    //for desktop
    document.querySelector("#rotateScreen").style.display = "none";
  }
}
mql.addListener(screenTest);

document.getElementById("rotateButton").addEventListener("click", start);
document
  .getElementById("rotateButton")
  .addEventListener("click", hideInfoAboutRotatingScreen);

function hideInfoAboutRotatingScreen() {
  document.querySelector("#rotateScreen").style.display = "none";
  document.querySelector("#startone").style.display = "block";
}
// Rotating the screen horizontally on mobile devices
function ready() {
  const { type } = screen.orientation;
  console.log(`Fullscreen and locked to ${type}. Ready!`);
}

async function start() {
  await document.body.requestFullscreen();
  await screen.orientation.lock("landscape");
  ready();
}
