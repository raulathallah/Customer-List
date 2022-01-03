const divContainer = document.getElementById('list_items');
const divList = document.createDocumentFragment();

const next = document.getElementById('next_page');
const prev = document.getElementById('prev_page');

const pagination = document.getElementById('pagination');

async function getData(current_page) {

    const response = await fetch("https://gorest.co.in/public/v1/users?page=" + current_page + "");
    const data = await response.json();

    pagination.innerHTML = " ";

    const row = document.getElementsByClassName('row');
    while (row.length > 0) {
        row[0].parentNode.removeChild(row[0]);
    }

    for (let i = 0; i < data['data'].length; i++) {

        if (data['data'][i].id == localStorage['id']) {
            //console.log("delete success");
            continue;
        } else {
            let div = document.createElement('div');
            let divStatusAction = document.createElement('div');

            let div1 = document.createElement('div');
            let div1Container = document.createElement('div');

            let div2 = document.createElement('div');
            let div2Container = document.createElement('div');

            let div3 = document.createElement('div');
            let div3Container = document.createElement('div');

            let name = document.createElement('p');
            let acc_id = document.createElement('p');
            let status = document.createElement('p');
            let actions = document.createElement('a');
            let bullet = document.createElement('span');

            if (data['data'][i].status == "active") {
                bullet.classList.add('active');
            } else {
                bullet.classList.remove('active');
                bullet.classList.add('dot');
            }
            acc_id.classList.add('secondary');
            name.classList.add('primary');

            bullet.innerHTML = "&#11044;"
            name.innerHTML = data['data'][i].name;
            status.innerHTML = data['data'][i].status.charAt(0).toUpperCase() + data['data'][i].status.slice(1);

            let acc_name = data['data'][i].name.split(" ");
            acc_id.innerHTML = "@" + acc_name[0].toLowerCase() + "_" + acc_name[acc_name.length - 1].toLowerCase();
            actions.innerHTML = "view cust";
            actions.href = "customer.html?user=" + data['data'][i].id;
            actions.onclick = getUserById(data, i);

            //CLASS LIST ADD
            div.classList.add('row')
            divStatusAction.classList.add('status_action_style')

            div1.classList.add('div1_style');
            div1Container.classList.add('container_width');

            div2.classList.add('status_style');
            div2.classList.add('div2_style');
            div2Container.classList.add('container_width');

            div3.classList.add('div3_style');
            div3Container.classList.add('container_width');


            //APPEND CHILD
            div1.appendChild(name);
            div1.appendChild(acc_id);
            div2.appendChild(bullet);
            div2.appendChild(status);
            div3.appendChild(actions);

            div1Container.appendChild(div1);
            div2Container.appendChild(div2);
            div3Container.appendChild(div3);

            divStatusAction.appendChild(div2Container);
            divStatusAction.appendChild(div3Container);


            div.appendChild(div1Container);
            div.appendChild(divStatusAction);

            divList.appendChild(div);
        }

    }

    let curr = data['meta']['pagination'].page;
    let page, divPage;

    for (let i = 0; i < 6; i++) {

        page = document.createElement('p');
        divPage = document.createElement('div');
        if (curr === current_page) {
            divPage.classList.add('active_page');
        }
        divPage.classList.add('page_number_box');
        page.innerHTML = curr++;
        divPage.appendChild(page);

        pagination.appendChild(divPage);
    }

    divContainer.appendChild(divList);

}

let current_page = 1;
getData(current_page);

next.onclick = () => {
    current_page++
    getData(current_page);
}

prev.onclick = () => {
    if (current_page === 1) {
        current_page = 1;
    } else {
        current_page--;
    }
    getData(current_page);
}

function getUserById(data, id) {
    var x = data['data'].find((user) => user.id === id);
    return x;
}