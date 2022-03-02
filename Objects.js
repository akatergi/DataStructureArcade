class LLNode {
    constructor(x, y, prev = null, next = null) {
        this.x = x
        this.y = y
        this.next = next
        this.prev = prev
    }
}

class DLL {
    constructor() {
        this.head = null
        this.tail = null
        this.n = 0
    }
    push(x, y) {
        let newNode = new LLNode(x, y, this.tail)
        if (!this.head) {
            this.head = newNode
        }
        else {
            this.tail.next = newNode
        }
        this.tail = newNode
        this.n++
    }
    toString() {
        let s = ""
        let node = this.head
        while (node) {
            s += "{" + node.x + "," + node.y + "},"
            node = node.next
        }
        return s
    }
    pop() {
        if (!this.head) return undefined
        let oldTail = this.tail

        if (this.n === 1) {
            this.head = null
            this.tail = null
        }
        else {
            let newTail = this.tail.prev
            newTail.next = null
            this.tail = newTail
            this.n--
            oldTail.prev = null
        }
        return oldTail
    }
    shift() {
        if (!this.head) return undefined
        let oldHead = this.head

        if (this.n === 1) {
            this.head = null
            this.tail = null
        }
        else {
            let newHead = this.head.next
            newHead.prev = null
            oldHead.next = null
            this.head = newHead
        }
        this.n--
        return oldHead
    }
    unshift(e) {
        let newNode = new LLNode(e, null, this.head)
        if (!this.head) this.tail = newNode
        else this.head.prev = newNode
        this.head = newNode
        this.n++
        return newNode
    }
    get(i) {
        if (i < 0 || i >= this.n) return undefined

        var node

        if (0 <= i <= this.n / 2) {
            node = this.head
            for (let j = 0; j < i; j++) {
                node = node.next
            }
        } else {
            node = this.tail
            for (let j = this.n - 1; j > i; j++) {
                node = node.prev
            }
        }
        return node
    }
    append(arr) {
        for (let el of arr) {
            this.push(el)
        }
    }
    set(i, x, y) {
        if (i < 0 || i >= this.n) return false

        let node = this.get(i)
        node.x = x
        node.y = y
        return true
    }
    insert(i, e) {
        if (i < 0 || i > this.n) return false

        if (i === 0) return this.unshift(e)
        else if (i === this.n) return this.push(e)

        let before = this.get(i - 1)
        let after = before.next
        let newNode = new LLNode(e, before, after)

        before.next = newNode
        after.prev = newNode

        this.n++
        return true
    }

    remove(i) {
        if (i < 0 || i >= this.n) return undefined

        if (i === 0) return this.shift()
        else if (i === this.n - 1) return this.pop()

        let prev = this.get(i - 1)
        let curr = prev.next
        let next = curr.next

        prev.next = next
        next.prev = prev

        curr.next = null
        curr.prev = null
        this.n--
        return curr
    }

    reverse() {
        let prev = null
        let curr = this.head

        let next
        this.head = this.tail
        this.tail = curr
        while (curr !== null) {
            next = curr.next

            let oldPrev = curr.prev
            curr.prev = next
            curr.next = oldPrev

            curr = next
            prev = curr
        }
        return this
    }
}

class BSTNode {
    constructor(s = null) {
        this.marvel = false
        this.hero = false
        this.mask = false
        this.male = false
        this.title = null
        this.left = null
        this.right = null
        this.prop = s
        if (s) this.setNodeAttribute(s)
    }
    setNodeAttribute(s) {
        if (s === "marvel") this.marvel = true
        if (s === "hero") this.hero = true
        if (s === "mask") this.mask = true
        if (s === "male") this.male = true
    }
    giveTitle(t) {
        this.title = t
    }
    print() {
        if (!this.title) {
            console.log(this.prop)
        }
        else {
            console.log(this.title)
            return
        }
        if (this.right) this.right.print()
        if (this.left) this.left.print()
    }
    copy() {
        var root = new BSTNode();
        if (!this.title) {
            if (this.marvel) root.marvel = true
            if (this.hero) root.hero = true
            if (this.mask) root.mask = true
            if (this.male) root.male = true
        }
        root.prop = this.prop
        if (this.right) root.right = this.right.copy()
        if (this.left) root.left = this.left.copy()
        return root
    }
    insert(node) {
        let b = node[this.prop]
        if(this.prop==="male") {
            if(b) this.right = node
            else this.left = node
        }
        else {
            if(b) this.right.insert(node)
            else this.left.insert(node)
        }
    }
}

export { DLL, BSTNode }