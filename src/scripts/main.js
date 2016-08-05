require("babel-polyfill");

import { Modal } from './module/modal/modal';


const testOpen = () => {
    console.log("Run On Open");
};
const testClose = () => {
    console.log("Run On Close");
};





// Modal1 Definition
let temp = "<div class='test'><h1>Modal Title</h1><section><p>Modal Content</p></section><footer><button>CTA</button></footer></div>";
const opt = {
    content: temp,
    onHide: testClose,
    onShow: testOpen
}







//Modal2 Definition
let temp2 = "<div><h1>Another Modal Title</h1><section><p>Modal2 Content</p></section><footer><button>Buy</button></footer></div>";
const opt2 = {
    content: temp2
}
//Modal2 Instanciation
const test2 = new Modal(opt2);
console.log( "test2 => ", test2);

// Modal1 Instanciation
const test = new Modal(opt);
console.log( "test => ", test);





// Testing method show/hide
const actionBtn = document.querySelector('.js-action');
actionBtn.addEventListener('click', function(e){
    let modalNumber = document.querySelector('#modalNum').value;
    let actionDo = document.querySelector('input[type="radio"]:checked').value;
    let selectModal = (modalNumber == 1) ? test : test2;
    console.log("modalNumber => ", modalNumber);
    console.log("Selected Modal => ", selectModal);
    if( actionDo == "show"){
        selectModal.show();
    }else{
        selectModal.hide();
    }
});