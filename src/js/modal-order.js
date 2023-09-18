import Notiflix from "notiflix";

const app = {
    form: document.querySelectorAll('.modal-order'),
    inp: Array.from(document.querySelectorAll('.input-order')),
    nameInput: document.querySelector('.js-name'),
    numberInput: document.querySelector('.js-number'),
    emailInput: document.querySelector('.js-email'),
    commentInput: document.querySelector('.js-comment'),
    btn: document.querySelector('.js-btn'),
};

app.form.forEach((form) => {
    form.addEventListener('submit', formSend);
});
app.inp.forEach(el => el.addEventListener('input', checkIn));


function formSend(e) {
    e.preventDefault();
    console.log({
        name: app.nameInput.value,
        number: app.numberInput.value,
        email: app.emailInput.value,
        comment: app.commentInput.value,
    });
    Notiflix.Notify.success(`Your order is accepted. Confirm your order by Email: ${app.emailInput.value}`);
    app.nameInput.value = "";
    app.numberInput.value = "";
    app.emailInput.value = "";
    app.commentInput.value = "";
     app.btn.disabled = true;
};


function valName(name) {
    const mob = /^[a-zA-Zа-яА-Я\s]+$/;
    return mob.test(name);
}
function valNum(number) {
    const mob = /^\+?3?8?(0\d{9}|[1-9]\d{8})$/;
    return mob.test(number);
}
function valEmail(email) {
    const mob = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return mob.test(email);
}

function checkIn() {
    let isValName = false;
    let isValEmail = false;
    let isValNum = false;

    if (app.nameInput.value.trim() === '') {
        Notiflix.Notify.warning('Please enter your name');
        app.nameInput.style.borderColor = '#ff0000';
    } else {
        app.nameInput.style.borderColor = '#9bb537';
        isValName = true;
    }
    
    if (app.numberInput.value.trim() === '' && app.numberInput === document.activeElement) {
        Notiflix.Notify.warning('Please enter your number');
        app.numberInput.style.borderColor = '#ff0000';
    } else if (valNum(app.numberInput.value)) {
        app.numberInput.style.borderColor = '#9bb537';
        isValNum = true;
    }
    
    if (app.emailInput.value.trim() === '' && app.emailInput === document.activeElement) {
        Notiflix.Notify.warning('Please enter your email');
        app.emailInput.style.borderColor = '#ff0000';
    } else if (valEmail(app.emailInput.value)) {
        app.emailInput.style.borderColor = '#9bb537';
        isValEmail = true;
    }

    if (isValName && isValNum && isValEmail) {
        app.btn.disabled = false;
    } else app.btn.disabled = true;
}
