const fields = ["sex", "profession", "health", "hobbi", "fear", "items", "fact1", "fact2"]

let characteristics;

fetch('characteristics.json')
  .then(response => response.json())
  .then(data => {
      characteristics = data;

      // вызываем функции, которые используют characteristics
      getRandomCard();
  })
  .catch(err => console.error(err));


function getSex() {
    const sex = document.getElementById("sex")
    const randomSex = Math.floor(Math.random() * 2)
    const randomAge = Math.floor(Math.random() * (80 - 18 + 1)) + 18
    const randomIndex = Math.floor(Math.random() * 3)
    let playerSex = ""
    let playerIndex = ""
    if (randomSex == 1) {
        playerSex = "Мужчина "
    }
    else {
        playerSex = "Женщина "
    }
    if (randomIndex == 1) {
        playerIndex = " (Бесплодность)"
    }
    else {
        playerIndex = ""
    }
    sex.value = playerSex + randomAge + " лет" + playerIndex
}
function getRandomCard() {
    for (const field of fields) {
        getRandomField(field)
        getButton(field)
    }
}

function getRandomField(field) {
    if (field == "sex") {
        getSex()
    }
    else {
        const options = characteristics[field]
        const randomIndex = Math.floor(Math.random() * options.length)
        const randomItem = options[randomIndex];
        const element = document.getElementById(field)
        element.value = randomItem
    }    

}
function getButton(buttonId) {
    if (buttonId == "sex") {
        const sexbutton = document.getElementById("sexbutton")
        sexbutton.onclick = function() {
            getSex()
        }
    }
    else {
        const button = document.getElementById(`${buttonId}button`)
        button.onclick = function() {
            getRandomField(buttonId);
        }
    }
}
    
 
