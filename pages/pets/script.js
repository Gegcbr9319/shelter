const burgerFirst = document.querySelector('.burgerFirst');
const nav_menu = document.querySelector('.nav_menu');
const body = document.body;
const menu_background = document.querySelector('.menu_background');
const Pets_card = document.querySelector("#pets_card");
const BTN_str_first = document.querySelector("#str_first");
const BTN_str_back = document.querySelector("#str_back");
const BTN_counter = document.querySelector("#counter");
const BTN_str_foward = document.querySelector("#str_foward");
const BTN_str_last = document.querySelector("#str_last");






const res = await fetch('../../assets/json/pets.json');
const respData = await res.json();


function getRandomInt() {
    return Math.floor(Math.random() * 8);
}
let array = new Array;
let set = new Set;
let count = 1;
let n = 0;
let numberStr = 1;

function width() {

    if (window.screen.width >= 1280) {
        n = 8;
        numberStr = 6;
    }
    if (window.screen.width >= 768 && window.screen.width < 1280) {
        n = 6;
        numberStr = 8;
    }
    if (window.screen.width < 768) {
        n = 3;
        numberStr = 16;
    }
}

width();

function randomSet() {
    set.clear();
    while (set.size < n) {

        let a = getRandomInt(8);
        set.add(a)
    }


}


function petsCard(data) {
    randomSet();
    set.forEach((item) => {

        const card = document.createElement("div")
        card.classList.add("card");
        card.id = item;
        card.innerHTML = `
        <img class="img_card" src="${data[item].img}">
        <h3>${data[item].name}</h3>
        <button class="button button_card" id="button_card">Learn more</button> 
        `
        Pets_card.appendChild(card);
    })

}
petsCard(respData);

Pets_card.addEventListener('click', (event) => {
    let petsNumber;
    if (event.path[0].getAttribute("class") === "card") {
        petsNumber = + (event.path[0].getAttribute("id"));
    }
    else if (event.path[1].getAttribute("class") === "card") {
        petsNumber = + (event.path[1].getAttribute("id"));
    }
    else {
        return
    }
    modalWindow(petsNumber);

});

function modalWindow(petsNumber) {

    const modal_body = document.createElement("div")
    modal_body.classList.add("modal_body");
    modal_body.id = "modal_body";
    modal_body.innerHTML = `
    <img class="img_modal_body" src=${respData[petsNumber].img}>
    <button class="button button_modal" id="button_modal">X</button>
    <div class="modal_info">
    <h2 class="modal_h2">${respData[petsNumber].name}</h2>
    <h3 class ="modal_h3">${respData[petsNumber].type} - ${respData[petsNumber].breed}</h3>
    <p class="modal_p">${respData[petsNumber].description}</p>
    <ul class="modal_ul">
    <li> Age : ${respData[petsNumber].age}</li>
    <li>Inoculations : ${respData[petsNumber].inoculations} </li>
    <li>Diseases : ${respData[petsNumber].disease}</li>
    <li>Parasites : ${respData[petsNumber].parasites}</li>
    </ul>
    </div>
    `

    document.querySelector("#modal_body").innerHTML = modal_body.innerHTML;

    const BTN_M = document.querySelector("#button_modal");
    BTN_M.addEventListener("click", modal_CardMinus);
    const ModalBody = document.querySelector("#modal_body");
    ModalBody.addEventListener('click', (e) => {
        e.stopPropagation();
    })
}


const M_Wind = document.querySelector("#modal_window");
const BTN_card = document.querySelector("#button_card");
const Card_all = document.querySelectorAll(".card");
function modal_Card() {
    M_Wind.classList.add("modal_open");
    Pets_card.classList.add('modal_card');
    body.classList.toggle('overflow-hidden');


}
Card_all.forEach((item) => {
    item.addEventListener('click', modal_Card);
})
BTN_card.addEventListener('click', modal_Card);

function modal_CardMinus() {
    M_Wind.classList.remove("modal_open");
    Pets_card.classList.remove('modal_card');
    body.classList.toggle('overflow-hidden');
}
M_Wind.addEventListener("click", modal_CardMinus);





BTN_counter.innerHTML = count;

BTN_str_foward.addEventListener("click", () => {
    document.querySelector("#pets_card").innerHTML = "";

    petsCard(respData);
    if (count < numberStr) {
        count = count + 1;
        BTN_counter.innerHTML = count;
    }
    console.log(count);
    counterR();
    counterL();
})

BTN_str_last.addEventListener("click", () => {
    document.querySelector("#pets_card").innerHTML = "";

    petsCard(respData);
    count = numberStr;
    BTN_counter.innerHTML = count;
    counterR();
    counterL();
})

BTN_str_back.addEventListener("click", () => {
    document.querySelector("#pets_card").innerHTML = "";

    petsCard(respData);
    if (count > 1) {
        count = count - 1;
        BTN_counter.innerHTML = count;
    }
    counterL();
    counterR();
})
BTN_str_first.addEventListener("click", () => {
    document.querySelector("#pets_card").innerHTML = "";

    petsCard(respData);
    count = 1;
    BTN_counter.innerHTML = count;
    counterL();
    counterR();

})

function counterL() {
    if (count < 2) {
        BTN_str_back.setAttribute("disabled", "");
        BTN_str_first.setAttribute("disabled", "");
    }
    else {
        BTN_str_back.removeAttribute("disabled");
        BTN_str_first.removeAttribute("disabled");

    }

}
counterL();
function counterR() {
    if (numberStr > count) {
        BTN_str_foward.removeAttribute("disabled");
        BTN_str_last.removeAttribute("disabled");
       
    }
    else {
        BTN_str_foward.setAttribute("disabled", "");
        BTN_str_last.setAttribute("disabled", "");
       
    }
}
counterR();




function toggleMenu() {
    burgerFirst.classList.toggle('burgeropen');
    nav_menu.classList.toggle('open');
    body.classList.toggle('overflow-hidden');
    menu_background.classList.toggle('open_background');
}
burgerFirst.addEventListener('click', toggleMenu);

const nav_list = document.querySelector('.nav-list');

function closeMenu(event) {
    burgerFirst.classList.remove('burgeropen');
    nav_menu.classList.remove('open');
    body.classList.remove('overflow-hidden');
    menu_background.classList.remove('open_background');

}
nav_list.addEventListener('click', closeMenu);
menu_background.addEventListener('click', closeMenu);