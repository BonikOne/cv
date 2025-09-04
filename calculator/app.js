const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById("btn3")
const btn4 = document.getElementById("btn4")
const btn5 = document.getElementById("btn5")
const btn6 = document.getElementById("btn6")
const btn7 = document.getElementById("btn7")
const btn8 = document.getElementById("btn8")
const btn9 = document.getElementById("btn9")
const btn0 = document.getElementById("btn0")
const clear = document.getElementById("clear")
const back = document.getElementById("back")
const ostatok = document.getElementById("ostatok")
const delenie = document.getElementById("delenie")
const umnojenie = document.getElementById("umnojenie")
const minus = document.getElementById("minus")
const plus = document.getElementById("plus")
const btnpoint = document.getElementById("btnpoint")
const ravno = document.getElementById("ravno")
const display = document.getElementById("display")
let displayNumbers = ""
let flag = false
const calculatorButtons = {"plus" : "+", "minus" : "-", "umnojenie" : "*", "delenie" : "/", "ostatok" : "%"}

function btnClickNumber(num) {
    displayNumbers += num
    display.value = displayNumbers
}

function operators(op) {
    const lastChar = displayNumbers[displayNumbers.length - 1];
    const last2Char = displayNumbers[displayNumbers.length - 2];
    if (displayNumbers.length === 0) {
        if (op == "-") {
            displayNumbers = "-"
            display.value = displayNumbers 
        }
        return;
    }
    if (op == "-" && "/+-*%-".includes(lastChar) && flag == false) {
        displayNumbers += "("
        display.value = displayNumbers 
        flag = true
        displayNumbers += "-"
    }
    else if (/\d/.test(lastChar)) {
        if (flag == true){
            displayNumbers += ")"
            flag = false
        }
        displayNumbers += op;
    } else {
        displayNumbers = displayNumbers.slice(0, -1) + op;
    }
    
    display.value = displayNumbers;
}

for (const key in calculatorButtons) {
    const operator = calculatorButtons[key];
    eval(`${key}.onclick = function() { operators("${operator}") }`);
}


for(let i = 0; i < 10; i++) {
    eval(`btn${i}.onclick = function() { btnClickNumber("${i}") }`);
}


btnpoint.onclick = function (){
    for (let i = displayNumbers.length; i >= 0; i--) {
        if ("/+-*%".includes(displayNumbers[i])){
            displayNumbers += "."
            display.value = displayNumbers 
            return
        }
        else if (displayNumbers[i] == "."){
            return
        } 
    }
    displayNumbers += "."
    display.value = displayNumbers 
}

clear.onclick = function (){
    displayNumbers = ""
    display.value = displayNumbers 
}

back.onclick = function (){
    displayNumbers = displayNumbers.slice(0, -1);
    display.value = displayNumbers 
}

ravno.onclick = function (){
    if (/[a-zA-Zа-яА-Я]/.test(displayNumbers)) {
        display.value = "ERROR";
        return;
    }
    if (flag == true){
        displayNumbers += ")"
        flag = false
    }
    displayNumbers = String(eval(displayNumbers))
    display.value = displayNumbers 
}

