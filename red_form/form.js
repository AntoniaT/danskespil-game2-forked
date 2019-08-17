window.addEventListener("DOMContentLoaded", init);

function init() {
  let status = 1;
  console.log(status)
  // removing the pulsing circle from the avatar
   document.querySelector("#circle").style.display = "none";
  // update the username from local storage
  function updateUserName(){
    const username = JSON.parse(localStorage.getItem("sp.user"));
    console.log(username.name);
    document.querySelector("#userName").textContent = username.name;
    document.querySelector("#userName_set").textContent = username.name;
  }
    updateUserName();
  document.querySelector("#choose").addEventListener("click", () => {
    document.querySelector("#frame1").style.display = "none";
    document.querySelector("#step2").classList.add("is-active");
    document.querySelector("#step1").classList.remove("is-active");
    document.querySelector("#step1").classList.add("is-complete");
    document.querySelector("#frame2").style.display = "flex";
    status = 2;
    console.log(status)

  });
  document.querySelector("#backBtn").addEventListener("click", () => {
    document.querySelector("#frame1").style.display = "flex";
    document.querySelector("#step2").classList.remove("is-active");
    document.querySelector("#step2").classList.remove("is-complete");
    document.querySelector("#step1").classList.add("is-active");
    document.querySelector("#step1").classList.remove("is-complete");
    document.querySelector("#frame2").style.display = "none";
    status = 1;
    console.log(status)

  });
  document.querySelector("#accept").addEventListener("click", () => {
    document.querySelector("#frame2").style.display = "none";
    document.querySelector("#frame3").style.display = "flex";
    document.querySelector("#step3").classList.add("is-active");
    document.querySelector("#step2").classList.remove("is-active");
    document.querySelector("#step2").classList.add("is-complete");
    status = 3
    console.log(status)

  });
  document.querySelector("#backBtn2").addEventListener("click", () => {
    document.querySelector("#frame2").style.display = "flex";
    document.querySelector("#frame3").style.display = "none";
    document.querySelector("#step3").classList.remove("is-active");
    document.querySelector("#step2").classList.add("is-active");
    document.querySelector("#step1").classList.add("is-complete");
    status = 2;
    console.log(status)
  });

  document.querySelector('#arrow').addEventListener('click', ()=> {
    if (status === 1){
      document.querySelector('#inner_div').style.display = 'none';
      document.querySelector('#side_nav').style.display = 'flex';
    }
    else if ( status === 2){
      document.querySelector("#frame1").style.display = "flex";
      document.querySelector("#step2").classList.remove("is-active");
      document.querySelector("#step2").classList.remove("is-complete");
      document.querySelector("#step1").classList.add("is-active");
      document.querySelector("#step1").classList.remove("is-complete");
      document.querySelector("#frame2").style.display = "none";
      status = 1;
    }
    else if (status === 3){
      document.querySelector("#frame2").style.display = "flex";
      document.querySelector("#frame3").style.display = "none";
      document.querySelector("#step3").classList.remove("is-active");
      document.querySelector("#step2").classList.add("is-active");
      document.querySelector("#step1").classList.add("is-complete");
      status = 2;
    }
  })

}
/* updating the user in our database */
const form = document.querySelector("#redForm");
const cardSubmit = document.querySelector('#saveAll');

cardSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("working");
    const redInputData = {
        account_type : 'red',
        nemid : form.elements.nemid.value,
        nempassword : form.elements.nempassword.value,
        card_holder : form.elements.card_holder.value,
        card_number : form.elements.card_number_part1.value + form.elements.card_number_part2.value + form.elements.card_number_part3.value + form.elements.card_number_part4.value,
        date: form.elements.date1.value + "/" + form.elements.date2.value,
        cvv: form.elements.cvc.value
    };
    console.log(redInputData);
    get(redInputData);
})
// First I get the old user data
function get(redInputData){
    const user = JSON.parse(localStorage.getItem("sp.user"));
    fetch('https://allpets-7f82.restdb.io/rest/danskespil/' + user._id,{
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": "5c7cef07cac6621685acbaec",
            "cache-control": "no-cache",
        }
    }).then(e => e.json())
    .then(currUserData => {
        console.log(currUserData)
        post(currUserData, redInputData);
    });
}

// Media queries 
window.addEventListener("resize", mediaQueries)
let x = window.matchMedia("(max-width: 500px)")
mediaQueries()
function mediaQueries() {
  if (x.matches) { // If media query matches
    console.log('width matches')
    document.querySelector('#account_set').classList.remove('current');
    document.querySelector('#gear').classList.remove('current');
    document.querySelector('#inner_div').style.display = 'none';

    document.querySelector('#account_set').addEventListener('click', ()=> {
      document.querySelector('#side_nav').style.display = 'none';
      document.querySelector('#inner_div').style.display = 'flex';
    })
  } 
  else{
    console.log('width does not match')
    document.querySelector('#side_nav').style.display = 'flex';
    document.querySelector('#inner_div').style.display = 'flex';
    document.querySelector('#account_set').classList.add('current');
    document.querySelector('#gear').classList.add('current');
    document.querySelector('#account_set').removeEventListener
  }
}

// Then I post the new redInputData to the database using the userId
function post(currUserData, redInputData) {
    //object.assign just mixes both obj data to one obj
    Object.assign(currUserData, redInputData);
    const postRedData = JSON.stringify(currUserData);
    fetch('https://allpets-7f82.restdb.io/rest/danskespil/' + currUserData._id, {
        method: 'post',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": "5c7cef07cac6621685acbaec",
            "cache-control": "no-cache",
        },
        body: postRedData
    }).then(e => e.json())
    .then(redData=>{
        console.log(redData)
        localStorage.setItem("sp.user", JSON.stringify(redData));
    });
}


