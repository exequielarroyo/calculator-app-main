console.clear();

const deleteBtn = document.getElementById('calc-delete');
const resetBtn = document.getElementById('calc-reset');
const calculateBtn = document.getElementById('calc-calculate');
const addBtn = document.getElementById('calc-add');
const minusBtn = document.getElementById('calc-minus');
const multiplyBtn = document.getElementById('calc-multiply');
const divideBtn = document.getElementById('calc-divide');

const calcOutput = document.getElementById('calc-output');

const numberBtns = document.querySelectorAll('.calc-buttons');


numberBtns.forEach(button => {
    button.addEventListener('click', e => {
        calcOutput.innerText = button.innerText;
    });
});

addBtn.addEventListener('click', e => {
    
});

calculateBtn.addEventListener('click', e => {

});

resetBtn.addEventListener('click', e => {

});

deleteBtn.addEventListener('click', e => {

});

calcOutput.innerText = '0';

// console.log(parseInt('1') + parseInt('2'));
