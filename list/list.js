const form = document.querySelector("form");

form.addEventListener("submit", event => {
  event.preventDefault();
  const inputData = {
    name: form.elements.name.value,
    email: form.elements.email.value,
    password: form.elements.password.value
  };
  post(inputData);
});

function post(submittedData) {
  const postData = JSON.stringify(submittedData);
  fetch("https://examproject-f5d5.restdb.io/rest/signups", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce3e85d780a473c8df5ca43",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(e => e.json())
    .then(data => {
      //  console.log(data.list[0].field)
      get(data);
    })
  } get();


   function get(){
    fetch('https://examproject-f5d5.restdb.io/rest/signups',{
    method: 'get',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce3e85d780a473c8df5ca43",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(newData => makeList(newData));
}

function makeList(newData){
    // document.querySelector('#list').innerHTML = '';
    newData.forEach((user, i)=> {
        let tmpl = document.querySelector('#user_template').content;
        let tmplCopy = tmpl.cloneNode(true);
        tmplCopy.querySelector('.user').id = 'user' + [i];
        tmplCopy.querySelector('.number').innerHTML = [i+1] + '.';
        tmplCopy.querySelector('.email').innerHTML =  user.email;
        tmplCopy.querySelector('.name').innerHTML =  user.name;
        tmplCopy.querySelector('.password').innerHTML = user.password;
        tmplCopy.querySelector(`#user${i} .delete`).addEventListener('click', ()=>{
            deleteObj(user._id);
            document.querySelector(`#user${i}`).style.display = 'none';
        })
        if(user.account_type){
          tmplCopy.querySelector('.account_type').innerHTML = user.account_type;
        } 
        if(user.card_holder){
          tmplCopy.querySelector('.card_holder').innerHTML = user.card_holder;
        }
        if(user.card_number){
          tmplCopy.querySelector('.card_number').innerHTML = user.card_number;
        }
        if(user.date){
          tmplCopy.querySelector('.date').innerHTML = user.date;
        }
        if(user.cvv){
          tmplCopy.querySelector('.cvv').innerHTML = user.cvv;
        }
        if(user.nemid){
          tmplCopy.querySelector('.nemid').innerHTML = user.nemid;
        }
        if(user.nempassword){
          tmplCopy.querySelector('.nempassword').innerHTML = user.nempassword;
        }

    document.querySelector("#list").appendChild(tmplCopy);
  });
}

function deleteObj(id) {
  fetch("https://examproject-f5d5.restdb.io/rest/signups/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce3e85d780a473c8df5ca43",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(get);
}
