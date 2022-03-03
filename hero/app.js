import { BSTNode } from "../Objects.js";

//First we must make the BST

let mask = new BSTNode("mask")
mask.left = new BSTNode("male")
mask.right = new BSTNode("male")

let mask2 = mask.copy()

let hero = new BSTNode("hero")
hero.left = mask
hero.right = mask2

let hero2 = hero.copy()

let root = new BSTNode("marvel")
root.right = hero
root.left = hero2

// Now we must insert all the heros

import heroes from "./heroes.js"

for (let i = 0; i < heroes.length; i++) {
    root.insert(heroes[i])
}

// DOM
const questions = [
    "Does your character belong to the Marvel Universe?",
    "Is your character a superhero (not a supervillain)?",
    "Does your character wear a mask?",
    "Is your character male?"
]
const imgs = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1200px-Marvel_Logo.svg.png",
    "https://www.edgeofexistence.org/edgeblog/wp-content/uploads/2015/09/justice-league-superhero-wallpaper-hd-1024x768.jpg",
    "https://cdn.vox-cdn.com/thumbor/tbasBtIYAWylX8aqm829BF_07aY=/0x0:2321x1753/1200x675/filters:focal(926x241:1296x611)/cdn.vox-cdn.com/uploads/chorus_image/image/66351706/GettyImages_1202254631.0.jpg",
    "https://i.insider.com/57fbc6714046dd87068b4997?width=1000&format=jpeg&auto=webp"
]

var qIdx = 0
const yes = document.getElementById("yes")
const no = document.getElementById("no")
const question = document.getElementById("question")
const qnum = document.getElementById("qnum")
const maincard = document.getElementById("maincard")
const cardImg = document.getElementById("cardImg")
const modal = document.getElementById("modal")
const char = document.getElementById("char")
const share = document.getElementById("share")
const closeModal = document.getElementById("closeModal")
const repeat = document.getElementById("repeat")

yes.addEventListener("click", () => {
    root = root.right
    nextQuestion()
})

no.addEventListener("click", () => {
    root = root.left
    nextQuestion()
})

function nextQuestion() {
    if (qIdx < 3) {
        qIdx++;
        question.innerText = questions[qIdx]
        qnum.innerText = qIdx + 1
        maincard.classList.remove(`bg${qIdx - 1}`)
        maincard.classList.add(`bg${qIdx}`)
        cardImg.setAttribute("src", imgs[qIdx])
    } else {
        endGame()
    }
}

let icon = {
    'Spiderman': '<i class="fas fa-spider"></i>',
    'Superman' : '<i class="fab fa-stripe-s"></i>',
    'Batgirl': '<i class="fas fa-bat"></i>',
    'Scarlet Witch': '<i class="fas fa-hat-wizard"></i>',
    'Thor': '<i class="fas fa-hammer"></i>',
    'Black Widow': '<i class="fa-brands fa-gitlab"></i>',
    'Green Goblin': '<i class="fas fa-bomb"></i>',
    'Hela': '<i class="fas fa-person-dress"></i>',
    'Thanos': '<i class="fas fa-mitten"></i>',
    'Mystique': '<i class="fas fa-x"></i>',
    'Flash': '<i class="fas fa-bolt"></i>',
    'Wonder Woman': '<i class="fas fa-crown"></i>',
    'Catwoman': '<i class="fas fa-cat"></i>',
    'Deathstroke': '<i class="fas fa-skull"></i>',
    'Joker': '<i class="fas fa-diamond"></i>',
    'Harley Quinn': '<i class="fas fa-heart"></i>'
}

function endGame() {
    char.innerHTML = `${root.title} ${icon[root.title]}`
    modal.classList.remove("hidden")
    maincard.classList.add("hidden")
}

share.addEventListener("click", () => {
    navigator.clipboard.writeText(`I just guessed ${root.title} using a binary tree!\nTry this yourself at ${document.URL}`)
})