import words from "./answers.js"
import guesses from "./guesses.js"
let guess = ""
let answer = words[Math.floor(Math.random() * words.length)]
let letterIdx = 0
let rowIdx = 0
let keyButtons = document.querySelectorAll(".keyButton")
let greens = new Set();
const modal = document.querySelector(".modal")
const modalTitle = document.querySelector("#titleText")
const closeModal = document.querySelector("#closeModal")

console.log(answer)
closeModal.addEventListener("click",hideModal)

const letterCounts = {}
for(let i=0;i<5;i++){
    letterCounts[answer[i]] ? letterCounts[answer[i]]+=1 : letterCounts[answer[i]]=1
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let board = [[], [], [], [], [], []]

for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
        board[i][j] = document.querySelector(`#tile${i}-${j}`)
    }
}

function hideModal(){
    modal.classList.add("hidden")
}

function handleClick() {
    let letter = this.getAttribute("letter")
    if (letter == "ENTER") {
        if (guesses.has(guess)) {
            submitWord()
        }
        else {
            alert("Could not find that word!")
        }
    } else if (letter == "BACKSPACE") {
        deleteLetter()
    } else if(letter=="ESC"){
        hideModal()
    } else {
        insertLetter(letter)
    }
}

function insertLetter(l) {
    if (letterIdx < 5) {
        let tile = board[rowIdx][letterIdx]
        tile.innerText = l
        guess += l;
        letterIdx++;
    }
}

function endGame() {
    info.removeAttribute("disabled")
    keyButtons.forEach(btn => {
        btn.removeEventListener("click", handleClick)
    })
}


function checkGameOver() {
    if (guess === answer || rowIdx == 6) {
        var innerText;
        if(guess===answer) innerText = "Congratulations! You Win!"
        else innerText = `Better Luck Next Time! The word was ${answer}`
        modalTitle.innerText = innerText;
        modal.classList.remove("hidden");
        endGame()
    }
}

const letters = {}
for (let i of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'){
    letters[i] = document.querySelector(`[letter=${i}]`)
}

function submitWord() {
    if (letterIdx === 5) {

        let myDict = {}
        for(let letter of guess){
            myDict[letter] = 0
        }

        for (let i = 0; i < 5; i++) {
            if (guess[i] === answer[i]) {
                myDict[guess[i]]++
            }
        }

        for (let i = 0; i < 5; i++) {
            if (guess[i] === answer[i]) {
                greens.add(guess[i])
                myDict[guess[i]]++
                board[rowIdx][i].classList.add("correct")
                if(letters[guess[i]].classList.contains("wrong")) letters[guess[i]].classList.remove("wrong");
                if(letters[guess[i]].classList.remove("wronglocation")) letters[guess[i]].classList.remove("wronglocation");
                letters[guess[i]].classList.add("correct")
            }
            else if (answer.includes(guess[i]) && myDict[guess[i]]<letterCounts[guess[i]]) {
                board[rowIdx][i].classList.add("wronglocation")
                myDict[guess[i]]++
                if (!greens.has(guess[i])) letters[guess[i]].classList.add("wronglocation")
            }
            else {
                board[rowIdx][i].classList.add("wrong")
                if(!letters[guess[i]].classList.contains("correct") && !letters[guess[i]].classList.contains("wronglocation")) letters[guess[i]].classList.add("wrong")
            }
        }

        rowIdx++;
        letterIdx = 0;
        checkGameOver()
        if(rowIdx!==6) guess = ""
    }
}

function deleteLetter() {
    if (letterIdx > 0) {
        guess = guess.slice(0, guess.length - 1)
        letterIdx--
        board[rowIdx][letterIdx].innerText = ""
    }
}

keyButtons.forEach(btn => btn.addEventListener("click", handleClick))

document.addEventListener("keydown", e => {
    try {
        var key = document.querySelector(`button[letter=${e.key.toUpperCase()}]`)
    } catch { }
    if (key) key.click();
})

const share = document.querySelector("#share")
share.addEventListener("click", () => {
    let res = ""
    let stop = false
    let c=0
    for(let i=0; i<6;i++){
        for(let j=0; j<5; j++){
            if(board[i][j].classList.contains("wrong")) res += "⬜"
            else if(board[i][j].classList.contains("wronglocation")) res += "🟨"
            else if(board[i][j].classList.contains("correct")) res += "🟩"
            else {stop=true; break;}
            if(j===4) res+="\n"
        }
        if(!stop) c++
    }
    if(c===6 && guess!==answer) c="X"
    navigator.clipboard.writeText(`Solved for word: ${answer} in ${c}/6 tries. Try for yourself at ${document.URL}\n` + res)

})

const info = document.getElementById("info")
info.addEventListener("click", () => modal.classList.remove("hidden"))