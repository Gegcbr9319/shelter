const burgerFirst = document.querySelector('.burgerFirst');
const nav_menu = document.querySelector('.nav_menu');
const body = document.body;
const menu_background = document.querySelector('.menu_background');
const BTN_LEFT = document.querySelector('#button_left');
const BTN_RIGHT = document.querySelector('#button_right');
const BTN_LEFT320 = document.querySelector('#button_left320');
const BTN_RIGHT320 = document.querySelector('#button_right320');
const CAROUSEL = document.querySelector('#card_container');
const PETS_Container = document.querySelector('#pets');




/*const ITEM_CENTER = document.querySelector('#item-center');
const ITEM_LEFT = document.querySelector('#item-left');
const ITEM_RIGHT = document.querySelector('#item-right');
const ITEM = document.querySelector(".item");
*/

function getRandomInt() {
    return Math.floor(Math.random() * 8);
}
let array = new Array;
let set = new Set;
let set1 = new Set;
let n = 0;
function width() {

    if (window.screen.width >= 1280) {
        n = 3;
    }
    if (window.screen.width >= 768 && window.screen.width < 1280) {
        n = 2;
    }
    if (window.screen.width < 768) {
        n = 1;
    }
}

width();
function randomSet() {
    set.clear();
    while (set.size < n) {
        let a = getRandomInt(8);
        if (!array.includes(a)) {
            set.add(a)
        }
    }
    array = [...set]

}

function randomSet1() {
    set1.clear();
    while (set1.size < n) {
        let b = getRandomInt(8);
        if (!array.includes(b)) {
            set1.add(b)
        }
    }
}

//console.log(set);

const res = await fetch('../../assets/json/pets.json');
const respData = await res.json();

console.log(respData);

function petsDiv() {
    const div = document.createElement("div")
    div.classList.add("item")
    return div;
}

let namesItem = ["item-center", "item-left", "item-right"]

for (let i = 0; i < 3; i++) {
    const div = petsDiv();
    div.id = namesItem[i];
    CAROUSEL.appendChild(div);
}





const ITEM_CENTER = document.querySelector('#item-center');
const ITEM_LEFT = document.querySelector('#item-left');
const ITEM_RIGHT = document.querySelector('#item-right');
const ITEM = document.querySelector(".item");







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
        ITEM_CENTER.appendChild(card);
    })

}
petsCard(respData);
const CARD = document.querySelector('.card');


ITEM_CENTER.addEventListener('click', (event) => {
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
    CAROUSEL.classList.add('modal_card');
    body.classList.toggle('overflow-hidden');


}
Card_all.forEach((item) => {
    item.addEventListener('click', modal_Card);
})
BTN_card.addEventListener('click', modal_Card);

function modal_CardMinus() {
    M_Wind.classList.remove("modal_open");
    CAROUSEL.classList.remove('modal_card');
    body.classList.toggle('overflow-hidden');
}



M_Wind.addEventListener("click", modal_CardMinus);

function petsCardLR(data) {
    randomSet();
    set.forEach((item) => {

        const card = document.createElement("div")
        card.classList.add("card");
        card.id = item;
        card.innerHTML = `
        <img class="img_card" src="${data[item].img}">
        <h3>${data[item].name}</h3>

        <button class="button button_card">Learn more</button> 
        `

        ITEM_RIGHT.appendChild(card);
        let left = ITEM_RIGHT.appendChild(card).cloneNode(true);
        ITEM_LEFT.append(left);


    })

}
petsCardLR(respData);

/*function petsCardRight(data) {
    randomSet1();

    document.querySelector("#item-right").innerHTML = "";

    set1.forEach((item) => {

        const card = document.createElement("div")
        card.classList.add("card");

        card.innerHTML = `
        <img class="img_card" src="${data[item].img}">
        <h3>${data[item].name}</h3>
        <button class="button button_card">Learn more</button> 
        `
        ITEM_RIGHT.appendChild(card);
    })

}
petsCardRight(respData);
*/



const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");

};

const moveRight = () => {
    CAROUSEL.classList.add("transition-right");

};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

    BTN_RIGHT320.addEventListener("click", moveRight);
        BTN_LEFT320.addEventListener("click", moveLeft);


            CAROUSEL.addEventListener("animationend", (animationEvent) => {
                let changedItem;

                if (animationEvent.animationName === "move-left") {
                    CAROUSEL.classList.remove("transition-left");
                    changedItem = ITEM_LEFT;
                    console.log(document.querySelector("#item-left").innerHTML);
                    document.querySelector("#item-center").innerHTML = ITEM_LEFT.innerHTML;
                    console.log(document.querySelector("#item-center").innerHTML)

                    document.querySelector("#item-left").innerHTML = '';
                    document.querySelector("#item-right").innerHTML = '';
                    petsCardLR(respData);



                } else {
                    CAROUSEL.classList.remove("transition-right");
                    changedItem = ITEM_RIGHT;
                    document.querySelector("#item-center").innerHTML = ITEM_RIGHT.innerHTML;
                    document.querySelector("#item-left").innerHTML = '';
                    document.querySelector("#item-right").innerHTML = '';
                    petsCardLR(respData);
                }
            })



            /*
            const createCardTemplate = () => {
                const card = document.createElement("div");
                card.classList.add("card");
                return card;
            }
            */


            //changedItem.innerHTML = "";











            /*
            BTN_RIGHT.addEventListener('click', () => {
                document.querySelector("#item-center").innerHTML = "";
                petsCard(respData);
               
            });
            BTN_LEFT.addEventListener('click', () => {
                document.querySelector("#item-center").innerHTML = "";
                petsCard(respData)
            });
            
            BTN_RIGHT320.addEventListener('click', () => {
                document.querySelector("#item-center").innerHTML = "";
                petsCard(respData)
            });
            BTN_LEFT320.addEventListener('click', () => {
                document.querySelector("#item-center").innerHTML = "";
                petsCard(respData)
            });
            */























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