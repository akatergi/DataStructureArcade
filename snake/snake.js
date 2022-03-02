import {DLL} from "../Objects.js"

let boardSize = 10
let gameOver = false
let tiles = [[], [], [], [], [], [], [], [], [], []]
for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        tiles[i][j] = document.querySelector(`#tile${i}-${j}`)
    }
}
let dirState = true
let appleState = true
const modal = document.querySelector(".modal")
const titleText = document.getElementById("titleText")
const closeModal = document.getElementById("closeModal")
const repeat = document.getElementById("repeat")

closeModal.addEventListener("click", () => modal.classList.add("hidden"))
document.addEventListener("keydown", e => e.key === "Escape" ? closeModal.click() : "")

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
                setTimeout(makeApples, Math.floor(Math.random() * 6000) + 4000)
                tiles[i][j].classList.remove("apple")
            }
        }
    }
}

function checkGameOver() {
    let walls = !(snake.head.x >= 0 && snake.head.x < boardSize && snake.head.y >= 0 && snake.head.y < boardSize)
    gameOver = walls || snake.checkOverlap()
}

//1: up
//2: down
//3: left
//4: right
snake.push(5, 4)
snake.push(5, 5)

function rec() {
    checkGameOver()
    if (!gameOver) {
        dirState = true
        display()
        snake.move()
        setTimeout(rec, 200)
    }
    else {
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
        appleState = false
        setTimeout(makeApples, Math.floor(Math.random() * 6000) + 4000)
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
    gameOver = false
    closeModal.click()
    snake.head=null
    snake.tail=null
    snake.direction=1
    snake.n=0

    snake.push(5, 5)
    snake.push(5, 6)
    rec()
    makeApples()
})

document.getElementById("share").addEventListener("click", () => {
    navigator.clipboard.writeText(`I just scored ${snake.n} in Snake game!\n Try for yourself at ${document.URL}\n`)
})

rec()
makeApples()