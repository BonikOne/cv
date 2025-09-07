const fields = ["sex", "profession", "health", "hobbi", "fear", "items", "fact1", "fact2"];

let characteristics;
let playerCount = 0;
let maxPlayers = 12;

fetch('characteristics.json')
  .then(response => response.json())
  .then(data => {
      characteristics = data;
      // Создаем первого игрока при загрузке
      addNewPlayer();
  })
  .catch(err => console.error(err));

function addNewPlayer() {
    if (playerCount >= maxPlayers) return;
    
    playerCount++;
    const playerId = `player-${playerCount}`;
    
    // Создаем контейнер для игрока
    const playerContainer = document.createElement('div');
    playerContainer.id = playerId;
    playerContainer.className = 'card';
    
    // Определяем размер карточки в зависимости от количества игроков
    updateCardSize(playerContainer);
    
    // Создаем HTML для карточки игрока
    playerContainer.innerHTML = `
        <input type="text" class="player-name-input" placeholder="Имя игрока" id="${playerId}-name">
        <h2>Карточка персонажа</h2>
        
        <div class="row">
            <label for="${playerId}-sex">Пол и возраст</label>
            <input type="text" class="inputElement" id="${playerId}-sex"/>
            <button id="${playerId}-sexbutton">&#10227</button> 
        </div>

        <div class="row">
            <label for="${playerId}-profession">Профессия</label>
            <input type="text" class="inputElement" id="${playerId}-profession"/>
            <button id="${playerId}-professionbutton">&#10227</button> 
        </div>

        <div class="row">
            <label for="${playerId}-health">Здоровье</label>
            <input type="text" class="inputElement" id="${playerId}-health"/>
            <button id="${playerId}-healthbutton">&#10227</button> 
        </div>

        <div class="row">
            <label for="${playerId}-hobbi">Хобби</label>
            <input type="text" class="inputElement" id="${playerId}-hobbi"/>
            <button id="${playerId}-hobbibutton">&#10227</button> 
        </div>

        <div class="row">
            <label for="${playerId}-fear">Фобия</label>
            <input type="text" class="inputElement" id="${playerId}-fear"/>
            <button id="${playerId}-fearbutton">&#10227</button> 
        </div>

        <div class="row">
            <label for="${playerId}-items">Багаж</label>
            <input type="text" class="inputElement" id="${playerId}-items"/>
            <button id="${playerId}-itemsbutton">&#10227</button> 
        </div>

        <div class="row">
            <label for="${playerId}-fact1">Факт 1</label>
            <input type="text" class="inputElement" id="${playerId}-fact1"/>
            <button id="${playerId}-fact1button">&#10227</button> 
        </div>

        <div class="row">
            <label for="${playerId}-fact2">Факт 2</label>
            <input type="text" class="inputElement" id="${playerId}-fact2"/>
            <button id="${playerId}-fact2button">&#10227</button> 
        </div>
    `;
    
    // Добавляем карточку игрока в контейнер
    const container = document.getElementById('players-container');
    container.appendChild(playerContainer);
    
    // Генерируем случайные характеристики для нового игрока
    generateRandomPlayer(playerId);
    
    // Настраиваем кнопки для нового игрока
    setupPlayerButtons(playerId);
    
    // Обновляем размеры всех карточек
    updateAllCardSizes();
    
    // Добавляем кнопку "+" если еще можно добавить игроков
    updateAddButton();
}

function updateCardSize(card) {
    // Убираем все классы размера
    card.classList.remove('compact', 'small', 'tiny');
    
    if (playerCount <= 2) {
        // Для 1-2 игроков - полный размер
        return;
    } else if (playerCount <= 4) {
        // Для 3-4 игроков - компактный размер
        card.classList.add('compact');
    } else if (playerCount <= 6) {
        // Для 5-6 игроков - маленький размер
        card.classList.add('small');
    } else {
        // Для 7+ игроков - очень маленький размер
        card.classList.add('tiny');
    }
}

function updateAllCardSizes() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        updateCardSize(card);
    });
}

function updateAddButton() {
    // Удаляем существующую кнопку добавления
    const existingAddButton = document.querySelector('.add-player-card');
    if (existingAddButton) {
        existingAddButton.remove();
    }
    
    // Добавляем новую кнопку только если не достигнут лимит
    if (playerCount < maxPlayers) {
        const container = document.getElementById('players-container');
        const addButton = document.createElement('div');
        addButton.className = 'add-player-card';
        
        // Определяем размер кнопки добавления
        if (playerCount <= 2) {
            // Для 1-2 игроков - полный размер
        } else if (playerCount <= 4) {
            addButton.classList.add('compact');
        } else if (playerCount <= 6) {
            addButton.classList.add('small');
        } else {
            addButton.classList.add('tiny');
        }
        
        addButton.innerHTML = '<div class="add-player-icon">+</div>';
        addButton.onclick = addNewPlayer;
        
        container.appendChild(addButton);
    }
}

function generateRandomPlayer(playerId) {
    for (const field of fields) {
        getRandomField(field, playerId);
    }
}

function getSex(playerId) {
    const sex = document.getElementById(`${playerId}-sex`);
    const randomSex = Math.floor(Math.random() * 2);
    const randomAge = Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const randomIndex = Math.floor(Math.random() * 3);
    let playerSex = "";
    let playerIndex = "";
    
    if (randomSex == 1) {
        playerSex = "Мужчина ";
    } else {
        playerSex = "Женщина ";
    }
    
    if (randomIndex == 1) {
        playerIndex = " (Бесплодность)";
    } else {
        playerIndex = "";
    }
    
    sex.value = playerSex + randomAge + " лет" + playerIndex;
}

function getRandomField(field, playerId) {
    if (field == "sex") {
        getSex(playerId);
    } else {
        const options = characteristics[field];
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomItem = options[randomIndex];
        const element = document.getElementById(`${playerId}-${field}`);
        element.value = randomItem;
    }
}

function setupPlayerButtons(playerId) {
    for (const field of fields) {
        const button = document.getElementById(`${playerId}-${field}button`);
        if (field === "sex") {
            button.onclick = function() {
                getSex(playerId);
            };
        } else {
            button.onclick = function() {
                getRandomField(field, playerId);
            };
        }
    }
}