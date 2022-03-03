const boardSize = 5
const board = [[], [], [], [], []]
const arr = [[], [], [], [], []]
let player1 = true
let gameOver = false
var winner

const XO = () => player1 ? 1 : 2
const icons = { 0: "", 1: '<i class="fas fa-times"></i>', 2: '<i class="far fa-circle"></i>' }
const modal = document.querySelector(".modal")
const share = document.getElementById("share")
const closeModal = document.getElementById("closeModal")
const winnerText = document.getElementById("winner")
closeModal.addEventListener('click', () => modal.classList.add("hidden"))
const info = document.getElementById("info")
info.addEventListener("click", () => modal.classList.remove("hidden"))
for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        board[i][j] = document.querySelector(`#tile${i}-${j}`)
        arr[i][j] = 0
    }
}

for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        board[i][j].addEventListener("click", handleTileClick)
    }
}

function handleTileClick(e) {
    let s = e.target.id.slice(4)
    s = s.split("-")
    updateBoard(s[0], s[1])
}

function updateBoard(i, j) {
    try {
        if (!arr[i][j]) {
            let player = XO()
            arr[i][j] = player
            board[i][j].innerHTML = icons[player]
            player1 = !player1
            if (checkGameOver()) {
                gameOver = true
                board.forEach(e => e.forEach(tile => {
                    tile.removeEventListener("click", handleTileClick)
                }))
                winnerText.innerText = winner === 1 ? "X" : "O"
                modal.classList.remove("hidden")
                share.addEventListener("click", () => navigator.clipboard.writeText(`I just won as player ${winner === 1 ? "X" : "O"} in TicTacToe!\n Play it yourself at ${document.URL}`))
                info.removeAttribute("disabled")
            }
        }
    } catch { }
}

function highlight(mode, i) {
    if (mode === 1) { //row
        for (let j = 0; j < boardSize; j++) {
            board[i][j].classList.add("highlight")
        }
    }
    else if (mode === 2) { //column
        for (let j = 0; j < boardSize; j++) {
            board[j][i].classList.add("highlight")
        }
    }
    else if (mode === 3) {
        for (let p = 0; p < boardSize; p++) {
            board[p][p].classList.add("highlight")
        }
    }
    else if (mode === 4) {
        for (let p = 0; p < boardSize; p++) {
            board[p][boardSize - 1 - p].classList.add("highlight")
        }
    }
    return true
}

function horizontals() {
    for (let i = 0; i < boardSize; i++) {
        let same = true
        for (let j = 0; j < boardSize - 1; j++) {
            if (arr[i][j] != arr[i][j + 1] || !arr[i][j]) {
                same = false
                break
            }
        }
        if (same) {
            highlight(1, i)
            winner = arr[i][0]
            return true
        }
    }
    return false
}

function verticals() {
    for (let j = 0; j < boardSize; j++) {
        let same = true
        for (let i = 0; i < boardSize - 1; i++) {
            if (arr[i][j] != arr[i + 1][j] || !arr[i][j]) {
                same = false
                break
            }
        }
        if (same) {
            highlight(2, j)
            winner = arr[0][j]
            return true
        }
    }
    return false
}

function diagonals() {
    let d1 = true

    for (let i = 0; i < boardSize - 1; i++) {
        if (arr[i][i] != arr[i + 1][i + 1] || !arr[i][i]) { d1 = false; break }
    }

    if (d1) {
        highlight(3, 0);
        winner = arr[0][0]
        return true
    }

    let d2 = true

    for (let i = 0; i < boardSize - 1; i++) {
        if (arr[i][boardSize - 1 - i] != arr[i + 1][boardSize - 1 - (i + 1)] || !arr[i][boardSize - 1 - i]) { d2 = false; break }
    }

    if (d2) {
        highlight(4, 0)
        winner = arr[0][boardSize - 1]
        return true
    }
}

function checkGameOver() {
    if (horizontals() || verticals() || diagonals()) return true
    return false
}