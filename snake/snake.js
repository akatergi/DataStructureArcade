import { DLL } from "../Objects.js"
let boardSize = 20
let gameOver = false
let tiles = []
let board = document.getElementById("board");
let dirState = true
let appleState = true
const modal = document.querySelector(".modal")
const titleText = document.getElementById("titleText")
const closeModal = document.getElementById("closeModal")
const repeat = document.getElementById("repeat")
const replace = document.querySelector("#replace")
var snakeSpeed = 70

class Snake extends DLL {
    constructor() {
        super()
        this.direction = 1
    }

    has(i, j) {
        let curr = this.head;
        while (curr) {
            if (curr.x === i && curr.y === j) return true
            curr = curr.next
        }
        return false
    }

    move() {
        let curr = this.tail;
        while (curr && curr != this.head) {
            if (curr.prev) { curr.x = curr.prev.x; curr.y = curr.prev.y }
            curr = curr.prev;
        }
        if (this.direction === 1) this.head.y--
        if (this.direction === 2) this.head.y++
        if (this.direction === 3) this.head.x--
        if (this.direction === 4) this.head.x++
    }

    eatApple() {
        var { x, y } = this.tail
        if (this.direction === 1) y++
        if (this.direction === 2) y--
        if (this.direction === 3) x++
        if (this.direction === 4) x--
        this.push(x, y)
    }

    checkOverlap() {
        let targetX = this.head.x
        let targetY = this.head.y
        let curr = this.head.next;
        while (curr) {
            if (curr.x === targetX && curr.y === targetY) return true
            curr = curr.next
        }
        return false
    }
}

let snake = new Snake();

function display() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {

            if (snake.has(i, j)) {
                tiles[i][j].classList.remove("empty")
                tiles[i][j].classList.add("snakeBody")
            }

            else {
                tiles[i][j].classList.remove("snakeBody");
                tiles[i][j].classList.add("empty")
            }

            if (tiles[i][j].classList.contains("apple") && snake.head.x === i && snake.head.y === j) {
                snake.eatApple()
                appleState = true
                makeApples()
                tiles[i][j].classList.remove("apple")
                tiles[i][j].firstChild.remove();
            }
        }
    }
}

function makeGame() {
    tiles = []
    for (let i = 0; i < boardSize; i++) {
        tiles[i] = []
        let thisRow = document.createElement("div");
        thisRow.classList.add("row");
        if (i % 2 == 0) thisRow.classList.add("row2");
        board.appendChild(thisRow)

        for (let j = 0; j < boardSize; j++) {
            let thisCol = document.createElement("div")
            thisCol.classList.add("tile")
            thisCol.id = `tile${i}-${j}`
            thisRow.append(thisCol)
            tiles[i][j] = thisCol
        }
    }
    document.querySelectorAll(".tile").forEach(el => {
        el.style.height = `${89 / boardSize}vh`
        el.style.width = `${89 / boardSize}vh`
        el.style.fontSize = `${89 / boardSize}vh`
    })
}

makeGame()

closeModal.addEventListener("click", () => modal.classList.add("hidden"))
document.addEventListener("keydown", e => e.key === "Escape" ? closeModal.click() : "")


function checkGameOver() {
    let walls = !(snake.head.x >= 0 && snake.head.x < boardSize && snake.head.y >= 0 && snake.head.y < boardSize)
    gameOver = walls || snake.checkOverlap()
}

//1: up
//2: down
//3: left
//4: right
snake.push(boardSize / 2, boardSize / 2 - 1)
snake.push(boardSize / 2, boardSize / 2)

function rec() {
    checkGameOver()
    if (!gameOver) {
        dirState = true
        display()
        snake.move()
        setTimeout(rec, snakeSpeed)
    }
    else {
        info.removeAttribute("disabled")
        titleText.innerText = `You scored a total of ${snake.n}!`
        modal.classList.remove("hidden")
    }
}

function makeApples() {
    if (!gameOver && appleState) {
        let randX = Math.floor(Math.random() * boardSize)
        let randY = Math.floor(Math.random() * boardSize)
        while (snake.has(randX, randY)) {
            randX = Math.floor(Math.random() * boardSize)
            randY = Math.floor(Math.random() * boardSize)
        }
        tiles[randX][randY].classList.add("apple")
        tiles[randX][randY].innerHTML = '<i class="fas fa-apple-alt"></i>'
        appleState = false
        makeApples()
    }
}

document.addEventListener("keydown", e => {
    const key = e.key
    if ((key === "w" || key === "ArrowUp") && snake.direction !== 2) {
        if (dirState) {
            snake.direction = 1
            dirState = false
        }
    } else if ((key === "s" || key === "ArrowDown") && snake.direction !== 1) {
        if (dirState) {
            snake.direction = 2
            dirState = false
        }
    } else if ((key === "a" || key === "ArrowLeft") && snake.direction !== 4) {
        if (dirState) {
            snake.direction = 3
            dirState = false
        }
    } else if ((key === "d" || key === "ArrowRight") && snake.direction !== 3) {
        if (dirState) {
            snake.direction = 4
            dirState = false
        }
    }
})

repeat.addEventListener("click", () => {
    board.innerHTML = ""
    gameOver = false
    appleState = true
    makeGame()
    closeModal.click()
    snake.head = null
    snake.tail = null
    snake.direction = 1
    snake.n = 0

    snake.push(boardSize / 2, boardSize / 2 - 1)
    snake.push(boardSize / 2, boardSize / 2)
    rec()
    makeApples()
})

const info = document.getElementById("info")
info.addEventListener("click", () => modal.classList.remove("hidden"))

document.getElementById("share").addEventListener("click", () => {
    navigator.clipboard.writeText(`I just scored ${snake.n} in Snake game!\n Try for yourself at ${document.URL}\n`)
})

rec()
makeApples()

let modalHTML = `
<p>Press the "Share" button below to share your score with friends, or press the "Try Again" button!</p>
<div>
  <button id="share">Share <i class="fas fa-share"></i></button>
  <button id="repeat">Try Again <i class="fas fa-repeat"></i></button>
  <button id="settings">Settings <i class="fas fa-cog"></i></button>
</div>
`
let settingsHTML = `
<div id="inputs">
<div class="formpair">
  <label class="myLabel" for="boardSize">Board Size:</label>
  <input type="number" class="myInput" min="5" max="50" name="boardSize" id="boardSize">
</div>
<div class="formpair">
  <label class="myLabel" for="snakeSpeed">Snake Speed:</label>
  <input type="number" class="myInput" min="50" max="1000" name="snakeSpeed" id="snakeSpeed">
</div>
</div>
<button id="save">Save Changes</button>
`

var Settings = document.getElementById("settings")

function handleSettings() {
    replace.innerHTML = settingsHTML
    let save = document.getElementById("save")
    document.getElementById("boardSize").value = boardSize
    document.getElementById("snakeSpeed").value = snakeSpeed

    save.addEventListener("click", () => {

        boardSize = document.getElementById("boardSize").value
        snakeSpeed = document.getElementById("snakeSpeed").value

        if (boardSize > 100) {
            alert("Cannot exceed 100 for board size");
        } else {

            repeat.click()
            replace.innerHTML = modalHTML

            document.getElementById("repeat").addEventListener("click", () => {
                board.innerHTML = ""
                gameOver = false
                appleState = true
                makeGame()
                closeModal.click()
                snake.head = null
                snake.tail = null
                snake.direction = 1
                snake.n = 0

                snake.push(boardSize / 2, boardSize / 2 - 1)
                snake.push(boardSize / 2, boardSize / 2)

                rec()
                makeApples()
            })

            document.getElementById("share").addEventListener("click", () => {
                navigator.clipboard.writeText(`I just scored ${snake.n} in Snake game!\n Try for yourself at ${document.URL}\n`)
            })

            document.getElementById("settings").addEventListener("click", handleSettings)
        }
    })
}

Settings.addEventListener("click", handleSettings)