/**
 * Lord Krishna English Medium School - Std 2 G.K Worksheet
 * Full Interactive Engine, Match Lines, Space Crossword & Print Controllers
 */

// ==============================================================
// 1. DATA DEFINITIONS
// ==============================================================

const MCQ_DATA = [
  { id: 1, q: "What is the capital of India?", opts: ["Mumbai", "New Delhi", "Chennai", "Surat"], ans: "B" },
  { id: 2, q: "Which is the national bird of India?", opts: ["Parrot", "Peacock", "Sparrow", "Crow"], ans: "B" },
  { id: 3, q: "How many days are there in a week?", opts: ["5", "6", "7", "8"], ans: "C" },
  { id: 4, q: "Which animal is known as the \"King of the Jungle\"?", opts: ["Tiger", "Elephant", "Lion", "Deer"], ans: "C" },
  { id: 5, q: "Which is the national flower of India?", opts: ["Rose", "Lotus", "Sunflower", "Jasmine"], ans: "B" },
  { id: 6, q: "Which part of our body helps us to see?", opts: ["Ears", "Nose", "Eyes", "Hands"], ans: "C" },
  { id: 7, q: "How many months are there in a year?", opts: ["10", "11", "12", "13"], ans: "C" },
  { id: 8, q: "Which planet do we live on?", opts: ["Mars", "Earth", "Venus", "Jupiter"], ans: "B" },
  { id: 9, q: "Which sense organ helps us to hear?", opts: ["Eyes", "Nose", "Ears", "Tongue"], ans: "C" },
  { id: 10, q: "Which fruit is known as the \"King of Fruits\"?", opts: ["Apple", "Mango", "Banana", "Orange"], ans: "B" },
  { id: 11, q: "How many legs does a spider have?", opts: ["6", "7", "8", "10"], ans: "C" },
  { id: 12, q: "Which is the largest animal on Earth?", opts: ["Elephant", "Blue Whale", "Giraffe", "Lion"], ans: "B" },
  { id: 13, q: "Which festival is known as the Festival of Lights?", opts: ["Holi", "Diwali", "Christmas", "Eid"], ans: "B" },
  { id: 14, q: "Which vehicle runs on railway tracks?", opts: ["Bus", "Car", "Train", "Bicycle"], ans: "C" },
  { id: 15, q: "How many colors are there in a rainbow?", opts: ["5", "6", "7", "9"], ans: "C" }
];

const ANIMALS_DATA = [
  { id: "tortoise", name: "Tortoise", col: "left", icon: "🐢" },
  { id: "rabbit", name: "Rabbit", col: "left", icon: "🐇" },
  { id: "hen", name: "Hen", col: "left", icon: "🐔" },
  { id: "lion", name: "Lion", col: "left", icon: "🦁" },
  { id: "pigeon", name: "Pigeon", col: "left", icon: "🕊️" },
  { id: "parrot", name: "Parrot", col: "left", icon: "🦜" },
  { id: "elephant", name: "Elephant", col: "right", icon: "🐘" },
  { id: "goat", name: "Goat", col: "right", icon: "🐐" },
  { id: "cow", name: "Cow", col: "right", icon: "🐄" },
  { id: "horse", name: "Horse", col: "right", icon: "🐎" },
  { id: "tiger", name: "Tiger", col: "right", icon: "🐅" },
  { id: "peacock", name: "Peacock", col: "right", icon: "🦚" }
];

const STATE_ANIMALS = [
  { name: "ROYAL BENGAL TIGER", state: "Madhya Pradesh / West Bengal", icon: "🐅", hint: "MP / WB" },
  { name: "ASIATIC LION", state: "Gujarat", icon: "🦁", hint: "Gir Forest" },
  { name: "INDIAN ELEPHANT", state: "Kerala / Jharkhand", icon: "🐘", hint: "Kerala / Karnataka" },
  { name: "ONE-HORNED RHINOCEROS", state: "Assam", icon: "🦏", hint: "Kaziranga" },
  { name: "SANGAI DEER", state: "Manipur", icon: "🦌", hint: "Loktak Lake" },
  { name: "MITHUN (GAYAL)", state: "Arunachal Pradesh / Nagaland", icon: "🐂", hint: "Arunachal" },
  { name: "BLACKBUCK", state: "Andhra Pradesh / Haryana / Punjab", icon: "🦌", hint: "AP / Punjab" },
  { name: "SNOW LEOPARD", state: "Himachal Pradesh / Ladakh", icon: "🐆", hint: "Himalayas" },
  { name: "WILD WATER BUFFALO", state: "Chhattisgarh", icon: "🐃", hint: "Central India" },
  { name: "BARASINGHA", state: "Madhya Pradesh / Uttar Pradesh", icon: "🦌", hint: "Kanha" },
  { name: "SAMBAR DEER", state: "Odisha", icon: "🦌", hint: "Eastern India" },
  { name: "NILGAI", state: "Bihar", icon: "🐂", hint: "Bihar / UP" }
];

// 10 Space Crossword Clues
const SPACE_CLUES = [
  { num: 1, name: "COMET", icon: "☄️", clue: "A celestial object with a bright glowing tail" },
  { num: 2, name: "UFO", icon: "🛸", clue: "Unidentified flying object seen in skies" },
  { num: 3, name: "SPACE SHUTTLE", icon: "🚀", clue: "Rocket vehicle designed for orbital flights" },
  { num: 4, name: "ASTRONAUT", icon: "👨‍🚀", clue: "Person trained to travel in spacecraft" },
  { num: 5, name: "SPACESHIP", icon: "🛰️", clue: "Vehicle designed for space travel" },
  { num: 6, name: "PLANE", icon: "✈️", clue: "Aircraft with wings that flies in sky" },
  { num: 7, name: "SPACECRAFT", icon: "🛸", clue: "Machine designed to operate in outer space" },
  { num: 8, name: "STAR", icon: "⭐", clue: "Luminous point in the night sky" },
  { num: 9, name: "SUN", icon: "☀️", clue: "The giant star at the center of solar system" },
  { num: 10, name: "ROCKET", icon: "🚀", clue: "Powerful projectile used to launch satellites" }
];

// Simplified Crossword Grid (12 cols x 11 rows) for Std-2
// Cell format: [row, col, letter, numberLabel or null]
const CROSSWORD_CELLS = [
  // 1. COMET (Horizontal)
  { r: 4, c: 1, letter: 'C', num: 1 }, { r: 4, c: 2, letter: 'O' }, { r: 4, c: 3, letter: 'M' }, { r: 4, c: 4, letter: 'E' }, { r: 4, c: 5, letter: 'T' },
  // 2. UFO (Horizontal)
  { r: 1, c: 3, letter: 'U', num: 2 }, { r: 1, c: 4, letter: 'F' }, { r: 1, c: 5, letter: 'O' },
  // 4. ASTRONAUT (Horizontal r:3)
  { r: 3, c: 5, letter: 'A', num: 4 }, { r: 3, c: 6, letter: 'S' }, { r: 3, c: 7, letter: 'T' }, { r: 3, c: 8, letter: 'R' }, { r: 3, c: 9, letter: 'O' }, { r: 3, c: 10, letter: 'N' },
  // 8. STAR (Vertical r:3..6, c:6)
  { r: 4, c: 6, letter: 'T' }, { r: 5, c: 6, letter: 'A' }, { r: 6, c: 6, letter: 'R' },
  // 9. SUN (Horizontal r:6, c:5..7)
  { r: 6, c: 5, letter: 'S', num: 9 }, { r: 6, c: 7, letter: 'N' },
  // 10. ROCKET (Horizontal r:8, c:4..9)
  { r: 8, c: 4, letter: 'R', num: 10 }, { r: 8, c: 5, letter: 'O' }, { r: 8, c: 6, letter: 'C' }, { r: 8, c: 7, letter: 'K' }, { r: 8, c: 8, letter: 'E' }, { r: 8, c: 9, letter: 'T' },
  // 6. PLANE (Vertical r:5..9, c:9)
  { r: 5, c: 9, letter: 'P', num: 6 }, { r: 7, c: 9, letter: 'L' }, { r: 9, c: 9, letter: 'A' }
];

const FOOD_DISHES = [
  { id: 1, name: "Idli", optA: "Gujarat", optB: "Tamil Nadu", correct: "B", icon: "⚪" },
  { id: 2, name: "Dhokla", optA: "Maharashtra", optB: "Gujarat", correct: "B", icon: "🟨" },
  { id: 3, name: "Litti Chokha", optA: "Bihar", optB: "Punjab", correct: "A", icon: "🥔" },
  { id: 4, name: "Puri Sabzi", optA: "Rajasthan", optB: "West Bengal", correct: "A", icon: "🍛" },
  { id: 5, name: "Vada Pav", optA: "Maharashtra", optB: "Kerala", correct: "A", icon: "🍔" },
  { id: 6, name: "Dal Baati Churma", optA: "Rajasthan", optB: "Gujarat", correct: "A", icon: "🍲" },
  { id: 7, name: "Misal Pav", optA: "Maharashtra", optB: "Gujarat", correct: "A", icon: "🍜" },
  { id: 8, name: "Appam", optA: "Kerala", optB: "Tamil Nadu", correct: "A", icon: "🥞" },
  { id: 9, name: "Pakhala Bhata", optA: "Odisha", optB: "Assam", correct: "A", icon: "🍚" },
  { id: 10, name: "Kachori", optA: "Rajasthan", optB: "Uttar Pradesh", correct: "A", icon: "🥟" },
  { id: 11, name: "Thepla", optA: "Gujarat", optB: "Maharashtra", correct: "A", icon: "🫓" },
  { id: 12, name: "Momos", optA: "Sikkim", optB: "Manipur", correct: "A", icon: "🥟" },
  { id: 13, name: "Poha", optA: "Madhya Pradesh", optB: "Bihar", correct: "A", icon: "🥣" },
  { id: 14, name: "Pitha", optA: "Assam", optB: "West Bengal", correct: "A", icon: "🍥" },
  { id: 15, name: "Dabeli", optA: "Gujarat", optB: "Maharashtra", correct: "A", icon: "🥪" }
];

const PICTURE_NAMES = [
  { num: 1, name: "Helicopter", icon: "🚁" },
  { num: 2, name: "Spinning Top", icon: "🪀" },
  { num: 3, name: "Yo-yo", icon: "🎯" },
  { num: 4, name: "Car", icon: "🚗" },
  { num: 5, name: "Bus", icon: "🚌" },
  { num: 6, name: "Cat", icon: "🐱" },
  { num: 7, name: "Lion", icon: "🦁" },
  { num: 8, name: "Fish", icon: "🐟" },
  { num: 9, name: "Dog", icon: "🐶" },
  { num: 10, name: "Duck", icon: "🦆" },
  { num: 11, name: "Rabbit", icon: "🐰" },
  { num: 12, name: "Tree", icon: "🌳" },
  { num: 13, name: "Sun", icon: "☀️" },
  { num: 14, name: "Butterfly", icon: "🦋" }
];

// Audio synthesizer for kid-friendly sound effects without external file dependencies
class SoundFX {
  static play(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'pop') {
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'fanfare') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch(e) {
      // Audio context might be restricted before user gesture
    }
  }
}

// State
let matchPairs = {};
let selectedLeftWord = null;
let selectedRightWord = null;
let answersVisible = false;

// ==============================================================
// 2. RENDER FUNCTIONS
// ==============================================================

function renderMCQ() {
  const container = document.getElementById("mcqContainer");
  container.innerHTML = MCQ_DATA.map(item => `
    <div class="mcq-item" data-id="${item.id}" data-answer="${item.ans}">
      <div class="mcq-content">
        <div class="mcq-q-text">
          <span class="mcq-q-num">Q.${item.id}.</span>${item.q}
        </div>
        <div class="mcq-options-row">
          ${item.opts.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            return `
              <label class="mcq-opt">
                <input type="radio" name="mcq_${item.id}" value="${letter}" onchange="handleMCQSelect(${item.id}, '${letter}')">
                <span class="mcq-opt-label">(${letter}) ${opt}</span>
              </label>
            `;
          }).join('')}
        </div>
      </div>
      <div class="mcq-box-target" id="mcq_box_${item.id}">
        <!-- Selected letter shown here -->
      </div>
    </div>
  `).join('');
}

function handleMCQSelect(id, letter) {
  const box = document.getElementById(`mcq_box_${id}`);
  box.textContent = letter;
  SoundFX.play('pop');
  updateLiveScore();
}

function renderMatchSection() {
  const leftCol = document.getElementById("matchColLeft");
  const rightCol = document.getElementById("matchColRight");
  const imgCol = document.getElementById("matchColImages");

  const leftItems = ANIMALS_DATA.filter(a => a.col === "left");
  const rightItems = ANIMALS_DATA.filter(a => a.col === "right");

  leftCol.innerHTML = leftItems.map(item => `
    <div class="match-item" id="match_word_${item.id}" onclick="selectMatchWord('${item.id}', 'left')">
      <span>${item.name}</span>
      <span class="match-dot"></span>
    </div>
  `).join('');

  rightCol.innerHTML = rightItems.map(item => `
    <div class="match-item" id="match_word_${item.id}" onclick="selectMatchWord('${item.id}', 'right')">
      <span class="match-dot"></span>
      <span>${item.name}</span>
    </div>
  `).join('');

  imgCol.innerHTML = ANIMALS_DATA.map(item => `
    <div class="animal-card" id="match_card_${item.id}" onclick="connectMatchCard('${item.id}')">
      <span style="font-size: 28px; line-height: 1;">${item.icon}</span>
      <span class="animal-name-tag">${item.name}</span>
    </div>
  `).join('');

  initMatchCanvas();
}

function selectMatchWord(id, side) {
  SoundFX.play('pop');
  document.querySelectorAll('.match-item').forEach(el => el.classList.remove('selected'));
  
  if (side === 'left') {
    selectedLeftWord = id;
    selectedRightWord = null;
    document.getElementById(`match_word_${id}`).classList.add('selected');
  } else {
    selectedRightWord = id;
    selectedLeftWord = null;
    document.getElementById(`match_word_${id}`).classList.add('selected');
  }
}

function connectMatchCard(cardId) {
  const activeWordId = selectedLeftWord || selectedRightWord;
  if (!activeWordId) return;

  if (activeWordId === cardId) {
    SoundFX.play('correct');
    matchPairs[cardId] = true;
    document.getElementById(`match_word_${cardId}`).classList.add('matched');
    document.getElementById(`match_card_${cardId}`).classList.add('matched');
  } else {
    SoundFX.play('pop');
    matchPairs[activeWordId] = cardId;
  }

  document.querySelectorAll('.match-item').forEach(el => el.classList.remove('selected'));
  selectedLeftWord = null;
  selectedRightWord = null;

  drawMatchLines();
  updateMatchStatus();
  updateLiveScore();
}

function initMatchCanvas() {
  const canvas = document.getElementById("matchCanvas");
  const board = document.getElementById("matchBoard");
  if (!canvas || !board) return;

  function resize() {
    canvas.width = board.clientWidth;
    canvas.height = board.clientHeight;
    drawMatchLines();
  }
  window.addEventListener('resize', resize);
  setTimeout(resize, 200);
}

function drawMatchLines() {
  const canvas = document.getElementById("matchCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const boardRect = document.getElementById("matchBoard").getBoundingClientRect();

  // Draw connected lines
  Object.keys(matchPairs).forEach((wordId, idx) => {
    const wordEl = document.getElementById(`match_word_${wordId}`);
    const targetCardId = matchPairs[wordId] === true ? wordId : matchPairs[wordId];
    const cardEl = document.getElementById(`match_card_${targetCardId}`);

    if (wordEl && cardEl) {
      const wRect = wordEl.getBoundingClientRect();
      const cRect = cardEl.getBoundingClientRect();

      const isLeft = wRect.left < cRect.left;
      const x1 = isLeft ? (wRect.right - boardRect.left) : (wRect.left - boardRect.left);
      const y1 = wRect.top + wRect.height / 2 - boardRect.top;

      const x2 = cRect.left + cRect.width / 2 - boardRect.left;
      const y2 = cRect.top + cRect.height / 2 - boardRect.top;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = (wordId === targetCardId) ? "#16a34a" : "#dc2626";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // End circle
      ctx.beginPath();
      ctx.arc(x1, y1, 4, 0, Math.PI * 2);
      ctx.arc(x2, y2, 4, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
    }
  });
}

function updateMatchStatus() {
  const count = Object.keys(matchPairs).filter(k => matchPairs[k] === true || matchPairs[k] === k).length;
  document.getElementById("matchStatusText").textContent = `Connected: ${count} / 12 pairs`;
}

function renderStateAnimals() {
  const container = document.getElementById("stateAnimalsGrid");
  container.innerHTML = STATE_ANIMALS.map((item, idx) => `
    <div class="state-animal-card" data-idx="${idx}">
      <div class="animal-header-bar">${item.name}</div>
      <div class="animal-photo-frame">
        <span style="font-size: 48px;">${item.icon}</span>
      </div>
      <div class="animal-answer-slot">
        <input type="text" class="state-input" id="state_input_${idx}" 
               placeholder="Enter State" 
               data-answer="${item.state}"
               oninput="checkStateAnswer(${idx})">
      </div>
    </div>
  `).join('');
}

function checkStateAnswer(idx) {
  const input = document.getElementById(`state_input_${idx}`);
  const target = input.dataset.answer.toLowerCase();
  const val = input.value.trim().toLowerCase();

  if (val.length > 2 && target.includes(val)) {
    input.classList.add("correct");
  } else {
    input.classList.remove("correct");
  }
  updateLiveScore();
}

function renderCrossword() {
  const board = document.getElementById("crosswordBoard");
  const cluesList = document.getElementById("crosswordCluesList");

  // Render clues list
  cluesList.innerHTML = SPACE_CLUES.map(c => `
    <div class="clue-item">
      <span class="clue-badge">${c.num}</span>
      <span class="clue-icon">${c.icon}</span>
      <span class="clue-name">${c.name}</span>
    </div>
  `).join('');

  // Build grid table 10 rows x 11 cols
  const rows = 10;
  const cols = 11;
  let html = '<table class="cw-table">';

  for (let r = 1; r <= rows; r++) {
    html += '<tr>';
    for (let c = 1; c <= cols; c++) {
      const match = CROSSWORD_CELLS.find(cell => cell.r === r && cell.c === c);
      if (match) {
        html += `
          <td class="cw-cell active-cell" id="cw_td_${r}_${c}">
            ${match.num ? `<span class="cw-cell-num">${match.num}</span>` : ''}
            <input type="text" maxlength="1" class="cw-input" 
                   id="cw_in_${r}_${c}" 
                   data-r="${r}" data-c="${c}" 
                   data-letter="${match.letter}" 
                   oninput="handleCwInput(this)">
          </td>
        `;
      } else {
        html += '<td class="cw-cell black-cell"></td>';
      }
    }
    html += '</tr>';
  }
  html += '</table>';
  board.innerHTML = html;
}

function handleCwInput(input) {
  const expected = input.dataset.letter.toUpperCase();
  const typed = input.value.toUpperCase();
  input.value = typed;

  if (typed === expected) {
    input.classList.add("correct");
    SoundFX.play('pop');
    
    // Auto advance to next active cell
    const r = parseInt(input.dataset.r);
    const c = parseInt(input.dataset.c);
    const nextInput = document.getElementById(`cw_in_${r}_${c + 1}`) || document.getElementById(`cw_in_${r + 1}_${c}`);
    if (nextInput) nextInput.focus();
  } else {
    input.classList.remove("correct");
  }
  updateLiveScore();
}

function renderFoodDishes() {
  const container = document.getElementById("foodDishGrid");
  container.innerHTML = FOOD_DISHES.map(item => `
    <div class="food-card" id="food_card_${item.id}">
      <div class="food-card-header">${item.id}. ${item.name}</div>
      <div class="food-img-frame">
        <span style="font-size: 34px;">${item.icon}</span>
      </div>
      <div class="food-options-box">
        <button class="food-opt-btn" id="food_${item.id}_A" onclick="handleFoodPick(${item.id}, 'A')">
          <span>a) ${item.optA}</span>
          <span class="food-opt-mark" id="mark_${item.id}_A"></span>
        </button>
        <button class="food-opt-btn" id="food_${item.id}_B" onclick="handleFoodPick(${item.id}, 'B')">
          <span>b) ${item.optB}</span>
          <span class="food-opt-mark" id="mark_${item.id}_B"></span>
        </button>
      </div>
    </div>
  `).join('');
}

function handleFoodPick(id, choice) {
  const dish = FOOD_DISHES.find(d => d.id === id);
  const btnA = document.getElementById(`food_${id}_A`);
  const btnB = document.getElementById(`food_${id}_B`);
  const markA = document.getElementById(`mark_${id}_A`);
  const markB = document.getElementById(`mark_${id}_B`);

  btnA.className = "food-opt-btn";
  btnB.className = "food-opt-btn";

  if (choice === dish.correct) {
    SoundFX.play('correct');
    if (choice === 'A') {
      btnA.classList.add('is-correct');
      markA.textContent = "✓";
      btnB.classList.add('is-wrong');
      markB.textContent = "✗";
    } else {
      btnB.classList.add('is-correct');
      markB.textContent = "✓";
      btnA.classList.add('is-wrong');
      markA.textContent = "✗";
    }
  } else {
    SoundFX.play('pop');
    if (choice === 'A') {
      btnA.classList.add('is-wrong');
      markA.textContent = "✗";
      btnB.classList.add('is-correct');
      markB.textContent = "✓";
    } else {
      btnB.classList.add('is-wrong');
      markB.textContent = "✗";
      btnA.classList.add('is-correct');
      markA.textContent = "✓";
    }
  }
  updateLiveScore();
}

function renderPictureNames() {
  const container = document.getElementById("pictureNamesGrid");
  container.innerHTML = PICTURE_NAMES.map(item => `
    <div class="pic-name-card" id="pic_card_${item.num}">
      <span class="pic-num-badge">${item.num}.</span>
      <div class="pic-thumb-frame">
        <span style="font-size: 32px;">${item.icon}</span>
      </div>
      <input type="text" class="pic-name-input" id="pic_in_${item.num}" 
             placeholder="Name" 
             data-target="${item.name}" 
             oninput="checkPicName(${item.num})">
    </div>
  `).join('');
}

function checkPicName(num) {
  const input = document.getElementById(`pic_in_${num}`);
  const target = input.dataset.target.toLowerCase();
  const val = input.value.trim().toLowerCase();

  if (val === target) {
    input.classList.add("correct");
    SoundFX.play('correct');
  } else {
    input.classList.remove("correct");
  }
  updateLiveScore();
}

function setupDanceClueCart() {
  const chips = document.querySelectorAll(".cart-chip");
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      SoundFX.play('pop');
      // Find first empty dance input
      const emptyInput = Array.from(document.querySelectorAll(".dance-state-input")).find(i => !i.value);
      if (emptyInput) {
        emptyInput.value = chip.textContent;
        checkDanceInput(emptyInput);
      }
    });
  });

  document.querySelectorAll(".dance-state-input").forEach(input => {
    input.addEventListener('input', () => checkDanceInput(input));
  });
}

function checkDanceInput(input) {
  const target = input.dataset.target.toLowerCase();
  const val = input.value.trim().toLowerCase();
  if (val.length > 2 && target.includes(val)) {
    input.classList.add("correct");
  } else {
    input.classList.remove("correct");
  }
  updateLiveScore();
}

// ==============================================================
// 3. SCORE & ANSWERS CONTROLLERS
// ==============================================================

function updateLiveScore() {
  let score = 0;

  // Q1 (15 Marks)
  MCQ_DATA.forEach(item => {
    const box = document.getElementById(`mcq_box_${item.id}`);
    if (box && box.textContent.trim() === item.ans) score += 1;
  });

  // Q2 (12 Marks)
  Object.keys(matchPairs).forEach(k => {
    if (matchPairs[k] === true || matchPairs[k] === k) score += 1;
  });

  // Q3 (12 Marks)
  STATE_ANIMALS.forEach((item, idx) => {
    const input = document.getElementById(`state_input_${idx}`);
    if (input && input.value.trim().toLowerCase().includes(item.hint.toLowerCase().split('/')[0].trim())) {
      score += 1;
    }
  });

  // Q4 (10 Marks)
  let cwCorrect = 0;
  CROSSWORD_CELLS.forEach(cell => {
    const input = document.getElementById(`cw_in_${cell.r}_${cell.c}`);
    if (input && input.value.toUpperCase() === cell.letter) cwCorrect++;
  });
  score += Math.min(10, Math.floor(cwCorrect / 3));

  // Q5 (15 Marks)
  FOOD_DISHES.forEach(dish => {
    const btn = document.getElementById(`food_${dish.id}_${dish.correct}`);
    if (btn && btn.classList.contains("is-correct")) score += 1;
  });

  // Q6 (14 Marks)
  PICTURE_NAMES.forEach(pic => {
    const input = document.getElementById(`pic_in_${pic.num}`);
    if (input && input.classList.contains("correct")) score += 1;
  });

  // Q7 (8 Marks)
  document.querySelectorAll(".dance-state-input").forEach(input => {
    if (input.classList.contains("correct")) score += 1;
  });

  // Display
  const total = 75;
  document.getElementById("scoreDisplay").textContent = `${score} / ${total}`;
  const pct = Math.round((score / total) * 100);
  document.getElementById("percentDisplay").textContent = `(${pct}%)`;
  document.getElementById("marksObtainedBox").textContent = `${score} / ${total}`;
}

function toggleShowAnswers() {
  answersVisible = !answersVisible;
  const btn = document.getElementById("btnShowAnswers");
  const btnText = document.getElementById("answerBtnText");

  if (answersVisible) {
    fillAllAnswers();
    btnText.textContent = "Hide Answers";
    SoundFX.play('fanfare');
  } else {
    resetAllAnswers();
    btnText.textContent = "Show Answers";
  }
}

function fillAllAnswers() {
  // Q1
  MCQ_DATA.forEach(item => {
    const box = document.getElementById(`mcq_box_${item.id}`);
    box.textContent = item.ans;
    box.classList.add("correct");
    const radio = document.querySelector(`input[name="mcq_${item.id}"][value="${item.ans}"]`);
    if (radio) radio.checked = true;
  });

  // Q2
  ANIMALS_DATA.forEach(item => {
    matchPairs[item.id] = true;
    const wEl = document.getElementById(`match_word_${item.id}`);
    const cEl = document.getElementById(`match_card_${item.id}`);
    if (wEl) wEl.classList.add("matched");
    if (cEl) cEl.classList.add("matched");
  });
  drawMatchLines();
  updateMatchStatus();

  // Q3
  STATE_ANIMALS.forEach((item, idx) => {
    const input = document.getElementById(`state_input_${idx}`);
    input.value = item.state;
    input.classList.add("correct");
  });

  // Q4
  CROSSWORD_CELLS.forEach(cell => {
    const input = document.getElementById(`cw_in_${cell.r}_${cell.c}`);
    if (input) {
      input.value = cell.letter;
      input.classList.add("correct");
    }
  });

  // Q5
  FOOD_DISHES.forEach(dish => {
    handleFoodPick(dish.id, dish.correct);
  });

  // Q6
  PICTURE_NAMES.forEach(pic => {
    const input = document.getElementById(`pic_in_${pic.num}`);
    input.value = pic.name;
    input.classList.add("correct");
  });

  // Q7
  document.querySelectorAll(".dance-state-input").forEach(input => {
    input.value = input.dataset.target;
    input.classList.add("correct");
  });

  updateLiveScore();
}

function resetAllAnswers() {
  // Q1
  MCQ_DATA.forEach(item => {
    const box = document.getElementById(`mcq_box_${item.id}`);
    box.textContent = "";
    box.classList.remove("correct", "wrong");
    const radios = document.querySelectorAll(`input[name="mcq_${item.id}"]`);
    radios.forEach(r => r.checked = false);
  });

  // Q2
  matchPairs = {};
  document.querySelectorAll('.match-item').forEach(el => el.classList.remove('matched', 'selected'));
  document.querySelectorAll('.animal-card').forEach(el => el.classList.remove('matched', 'selected'));
  drawMatchLines();
  updateMatchStatus();

  // Q3
  STATE_ANIMALS.forEach((item, idx) => {
    const input = document.getElementById(`state_input_${idx}`);
    input.value = "";
    input.classList.remove("correct");
  });

  // Q4
  CROSSWORD_CELLS.forEach(cell => {
    const input = document.getElementById(`cw_in_${cell.r}_${cell.c}`);
    if (input) {
      input.value = "";
      input.classList.remove("correct");
    }
  });

  // Q5
  FOOD_DISHES.forEach(dish => {
    const btnA = document.getElementById(`food_${dish.id}_A`);
    const btnB = document.getElementById(`food_${dish.id}_B`);
    const markA = document.getElementById(`mark_${dish.id}_A`);
    const markB = document.getElementById(`mark_${dish.id}_B`);
    btnA.className = "food-opt-btn";
    btnB.className = "food-opt-btn";
    markA.textContent = "";
    markB.textContent = "";
  });

  // Q6
  PICTURE_NAMES.forEach(pic => {
    const input = document.getElementById(`pic_in_${pic.num}`);
    input.value = "";
    input.classList.remove("correct");
  });

  // Q7
  document.querySelectorAll(".dance-state-input").forEach(input => {
    input.value = "";
    input.classList.remove("correct");
  });

  updateLiveScore();
}

// ==============================================================
// 4. PRINT HANDLERS
// ==============================================================

function printBlankWorksheet() {
  resetAllAnswers();
  window.print();
}

function printSolutionSheet() {
  fillAllAnswers();
  window.print();
}

// ==============================================================
// 5. EVENT LISTENERS & INITIALIZATION
// ==============================================================

document.addEventListener("DOMContentLoaded", () => {
  renderMCQ();
  renderMatchSection();
  renderStateAnimals();
  renderCrossword();
  renderFoodDishes();
  renderPictureNames();
  setupDanceClueCart();

  // Button hooks
  document.getElementById("btnShowAnswers").addEventListener("click", toggleShowAnswers);
  document.getElementById("btnResetAll").addEventListener("click", resetAllAnswers);
  document.getElementById("btnPrintBlank").addEventListener("click", printBlankWorksheet);
  document.getElementById("btnPrintSolution").addEventListener("click", printSolutionSheet);

  document.getElementById("btnClearMatch").addEventListener("click", () => {
    matchPairs = {};
    document.querySelectorAll('.match-item').forEach(el => el.classList.remove('matched', 'selected'));
    document.querySelectorAll('.animal-card').forEach(el => el.classList.remove('matched', 'selected'));
    drawMatchLines();
    updateMatchStatus();
  });

  document.getElementById("btnCheckScore").addEventListener("click", () => {
    updateLiveScore();
    SoundFX.play('fanfare');
    const scoreText = document.getElementById("scoreDisplay").textContent;
    alert(`🎉 Worksheet Checked!\nYour Current Score: ${scoreText}\nKeep it up!`);
  });

  // View switchers
  const btnInteractive = document.getElementById("btnInteractiveMode");
  const btnWorksheet = document.getElementById("btnWorksheetMode");

  btnInteractive.addEventListener("click", () => {
    btnInteractive.classList.add("active");
    btnWorksheet.classList.remove("active");
  });

  btnWorksheet.addEventListener("click", () => {
    btnWorksheet.classList.add("active");
    btnInteractive.classList.remove("active");
    resetAllAnswers();
  });
});
