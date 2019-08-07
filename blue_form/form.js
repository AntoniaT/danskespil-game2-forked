const form = document.querySelector("#newForm");

form.addEventListener("submit", event => {
  event.preventDefault();
  const inputData = {
    email: form.elements.email.value,
    name: form.elements.name.value,
    password: form.elements.password.value
  };
  post(inputData);
});

function post(submittedData) {
  const postData = JSON.stringify(submittedData);
  fetch("https://allpets-7f82.restdb.io/rest/danskespil", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7cef07cac6621685acbaec",
      "cache-control": "no-cache"
    },
    body: postData

  }).then(e => e.json())
  .then(blueData => {
    makeAlert(blueData);
    console.log(blueData);
    localStorage.setItem("sp.user", JSON.stringify(blueData));
    window.location = "../main/spillejhornet.html";
  });

}

function makeAlert(data){
  console.log('hi')
  console.log(data);
/*   if (data.list[0].message[0] === 'Already exists'){
      alert('Email ' + data.list[0].message[0]);
      

       }
       else {
           alert(data.list[0].message[0])
       } */
}

