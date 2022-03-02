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

let heroIdx = 0 //Global variable representing which hero is currently being viewed

