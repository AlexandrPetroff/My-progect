import { el, setChildren } from 'redom';
import IMask from 'imask';
import Visa from './img/Visa.jpg';
import Mir from './img/Mir.jpg';
import American from './img/American.jpg';
import Master from './img/Master.jpg';
import Standart from './img/Standart.jpg';

// maskedClass, regexps
const cardNrMaskOpt = {
    mask: '0000 0000 0000 0000'
}
const cardExpireMaskOpt = {
        mask: "M/Y",
        blocks: {
          M: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            minLength: 2,
            maxLength: 2,
          },
          Y: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 99,
            minLength: 2,
            maxLength: 2
          }
        },
}

const cardCvvMaskOpt = {
    mask: '000'
}

const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
const app = el('div', { class: "app-container" })
const h1 = el('h1', { class: 'form-title' }, 'Online payment form')

// Inputs
const form = el('form', { class: "payment-form", id: "form-validate" })
// Input nuber
const labelNumber = el('label', [{ class: "label-number" }])
const labelInputText = el('p', { class: "label-number" }, 'Input card number')
const inputNumber = el('input', { class: "input-number", type: "text", id: "input-number" })
// Input Expire
const labelExpire = el('label', { class: "label-expire" })
const labelExpireText = el('p', { class: "label-expire-text" }, 'Input card expire')
const inputExpire = el('input', { class: "input-number", type: "text", id: "input-expire" })
// Input CVV
const labelCvv = el('label', { class: "label-cvv" })
const labelCvvText = el('p', { class: "label-cvv-text" }, 'Input card cvv')
const inputCvv = el('input', { class: "input-cvv", type: "text", id: "input-cvv" })
// Input e-mail
const labelEmail = el('label', { class: "label-email" })
const labelEmailText = el('p', { class: "label-email-text" }, 'Input your email')
const inputEmail = el('input', { class: "input-email", type: "text", id: "input-email" })
// Button
const btn = el('button', { class: "btn", type: "submit", id: "btn", disabled: true}, 'Оправить');

let img = el('img', {src: Standart, class: 'system-img'})


setChildren(form, labelNumber, labelExpire, labelCvv, labelEmail, btn, img)
setChildren(labelNumber, labelInputText, inputNumber)
setChildren(labelExpire, labelExpireText, inputExpire)
setChildren(labelCvv, labelCvvText, inputCvv)
setChildren(labelEmail, labelEmailText, inputEmail)
setChildren(app, h1, form)
setChildren(window.document.body, app)

let inputNrFlag = false, inputExpFlag, inputCvvFlag, inputEmailFlag;
let dateNow = new Date()
let month = dateNow.getDate()
let year = dateNow.getFullYear()

function successCheck() {
    if(inputNrFlag === true && inputExpFlag === true && inputCvvFlag === true && inputEmailFlag === true){
        btn.disabled = false
    } else {
        btn.disabled = true
    }
}

inputNumber.addEventListener('blur', function() {
    if(inputNumber.value.length !== 19) {
        changeToInvalid(labelInputText, 'Please input correct card number (16 digits)', inputNrFlag, inputNumber)
        inputNrFlag = false;
    } else {
        changeToValid(labelInputText, 'Input card number', inputNrFlag, inputNumber)
        inputNrFlag = true;
        if(this.value[0] === '2') {
            addSystemImg(Mir)
        } else if(this.value[0] === '3') {
            addSystemImg(Visa)
        } else if(this.value[0] === '4') {
            addSystemImg(American)
        } else if(this.value[0] === '5') {
            addSystemImg(Master)
        } else {
            addSystemImg(Standart)
        }
    }
    successCheck()
})

inputExpire.addEventListener('blur', function() {
    let sepDate = this.value.split('/')
    if(inputExpire.value.length !== 5) {
        changeToInvalid(labelExpireText, 'Please input card expire date in format MMYY', inputExpFlag, inputExpire)
        inputExpFlag = false;
    } else {
        if((Number(sepDate[1]) + 2000) >= year) {
            if(sepDate[0] >= month) {
                changeToValid(labelExpireText, 'Input card expire', inputExpFlag, inputExpire)
                inputExpFlag = true;
            } else {
                changeToInvalid(labelExpireText, 'Expired date should not be in past', inputExpFlag, inputExpire)
                inputExpFlag = false;
            }
        } else {
            changeToInvalid(labelExpireText, 'Expired date should not be in past', inputExpFlag, inputExpire)
            inputExpFlag = false;
        }
    }
    successCheck()
})

inputCvv.addEventListener('blur', function() {
    if(inputCvv.value.length !== 3) {
        changeToInvalid(labelCvvText, 'Please input correct Cvv (3 digits)' , inputCvvFlag, inputCvv)
        inputCvvFlag = false;
    } else {
        changeToValid(labelCvvText, 'Input card cvv', inputCvvFlag, inputCvv)
        inputCvvFlag = true;
    }
    successCheck()
})

inputEmail.addEventListener('blur', function() {
    if(!emailRegexp.test(this.value)) {
        changeToInvalid(labelEmailText, 'Please input correct e-mail', inputEmailFlag, inputEmail)
        inputEmailFlag = false;
    } else {
        changeToValid(labelEmailText, 'Input your email', inputEmailFlag, inputEmail)
        inputEmailFlag = true;
    }
    successCheck()
})

function changeToInvalid(label, text, flag, input){
    label.innerText = text,
    label.style.color = 'red'
    flag = false;
    input.style.backgroundColor = 'rgb(226, 192, 192)'
}

function changeToValid(label, text, flag, input) {
    label.innerText = text
    label.style.color = 'rgb(12, 94, 33)'
    flag = true;
    input.style.backgroundColor = 'rgb(136, 245, 163)'
}

function addSystemImg(system){
    img.remove()
    img = el('img', {src: system, class: 'system-img'})
    form.append(img)
}

const maskExp = IMask(inputNumber, cardNrMaskOpt);
const maskNr = IMask(inputExpire, cardExpireMaskOpt);
const masCvv = IMask(inputCvv, cardCvvMaskOpt);
