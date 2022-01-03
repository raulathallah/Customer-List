let dictionaryParams = {};

async function getData() {

    let url = window.location.href;
    let url_s = url.split("?")[1]; //http://127.0.0.1:5500/index.html ? page=5&user=1

    let url_ss = url_s.split("&"); //page=5 & user=1

    let url_sss;
    for (let i = 0; i < url_ss.length; i++) {
        url_sss = url_ss[i].split("="); //user = 5
        dictionaryParams[url_sss[0]] = url_sss[1];
    }

    const response = await fetch("https://gorest.co.in/public/v1/users/" + dictionaryParams['user'] + "");
    const data = await response.json();

    let nama = document.getElementById('name_box');
    let acc_id = document.getElementById('account_box');
    let gender = document.getElementById('gender_box');
    let email = document.getElementById('email_box');
    let statA = document.getElementById('active');
    let statI = document.getElementById('inactive');


    nama.innerHTML = data['data'].name;

    let acc_name = data['data'].name.split(" ");
    acc_id.innerHTML = "@" + acc_name[0].toLowerCase() + "_" + acc_name[acc_name.length - 1].toLowerCase();

    gender.innerHTML = data['data'].gender;
    email.innerHTML = data['data'].email;

    if (data['data'].status === 'active') {
        statA.classList.add('block');
        statI.classList.remove('block');
    } else if (data['data'].status === 'inactive') {
        statA.classList.remove('block');
        statI.classList.add('block');
    }
}

let deleteBtn = document.getElementById('delete');
deleteBtn.onclick = () => {
    localStorage.setItem("id", dictionaryParams['user']);
    window.location.href = "index.html";
}
getData();