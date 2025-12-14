let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

// High Score (saved even after refresh)
let highScore = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");

// Start game
document.addEventListener("keypress", function () {
    if (started === false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

// Flash for Simon
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash for User
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Level Up Logic
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} | High Score: ${highScore}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

// Check User Answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let score = level - 1;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerHTML = `Game Over! Your score was <b>${score}</b><br>
        High Score: <b>${highScore}</b><br>
        Press any key to Restart.`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Button Press Handler
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Attach click events
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset Game (NOT high score)
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
