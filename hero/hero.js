const nextBtn = document.querySelector("#next")
const prevBtn = document.querySelector("#prev")

let heroIdx = 0 //Global variable representing which hero is currently being viewed

const hTitle = document.getElementById("hTitle")
const universe = document.getElementById("universe")
const gender = document.getElementById("gender")
const masked = document.getElementById("mask")
const status = document.getElementById("status")
const hImg = document.getElementById("hImg")

import heroes from "./heroes.js"

function displayHero() {
    var { marvel, hero, mask, title, male, img } = heroes[heroIdx]
    hTitle.innerText = title
    universe.innerText = marvel ? "Marvel" : "DC"
    gender.innerText = male ? "Male" : "Female"
    masked.innerText = mask ? "Yes" : "No"
    status.innerText = hero ? "Hero" : "Villain"
    // hImg.style.backgroundImage = `url:(${img})`
    hImg.style.backgroundImage = `url('${img}')`;
}

nextBtn.addEventListener('click', () => {
    if (heroIdx < heroes.length - 1) {
        heroIdx++;
        displayHero();
    }
})

prevBtn.addEventListener('click', () => {
    if (heroIdx > 0) {
        heroIdx--;
        displayHero();
    }
})