const canvas = document.querySelector("canvas")
const WIDTH = 500
const HEIGHT = 700
const GRAVITY = 0.9
canvas.width = WIDTH
canvas.height = HEIGHT
let pressedRight = false
let pressedLeft = false
let score = 0
let prevPlatform = 1
let curPlatform = 1
let over = false
const cloud_img = new Image()
cloud_img.src = "./assets/cloud.png"
const cat_img = new Image()
cat_img.src = "./assets/cat.png"

const ctx = canvas.getContext("2d")
ctx.fillStyle = "skyblue"
ctx.fillRect(0, 0, canvas.width, canvas.height)

function displayBackground() {
    ctx.fillStyle = "skyblue"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

class Player {
    constructor() {
        this.x = 100
        this.y = 100
        this.dx = 0
        this.dy = 0
        this.height = 50
        this.width = 50
        this.isJumping = false
    }

    render() {
        ctx.fillStyle = "transparent"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(cat_img, this.x - 10, this.y - 10, 75, 75)
    }

    update() {
        this.y += this.dy
        this.x += this.dx
        this.dy += GRAVITY

        clouds.forEach((cloud, index) => {
            if (this.collide(cloud)) {
                this.y = cloud.y - this.height
                this.dy = cloud.dy
                this.isJumping = false
                curPlatform = index
            }
        })

        this.render()
    }

    collide(platform) {
        if (
            this.y + this.height < platform.y ||
            this.y > platform.y + platform.height ||
            this.x + this.width < platform.x ||
            this.x > platform.x + platform.width
        ) return false
        if (this.dy > 0) return true
        return false
    }
}

class Platform {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.dx = 0
        this.dy = 2
        this.height = 10
        this.width = 200
    }

    render() {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(cloud_img, this.x, this.y - 80, 200, 180)
    }

    update() {
        this.y += this.dy
        this.render()

        if (this.y + this.height > canvas.height) {
            this.y  = -10
            this.x = Math.floor(Math.random() * 300)
        }
    }
}

const cloud1 = new Platform(Math.floor(Math.random() * 300), 600)
const cloud2 = new Platform(Math.floor(Math.random() * 300), 450)
const cloud3 = new Platform(Math.floor(Math.random() * 300), 300)
const cloud4 = new Platform(Math.floor(Math.random() * 300), 150)
const cloud5 = new Platform(Math.floor(Math.random() * 300), 0)

const clouds = [
    cloud1,
    cloud2,
    cloud3,
    cloud4,
    cloud5
]

function renderClouds() {
    clouds.forEach((cloud) => {
        cloud.update()
    })
}

function gameOverCard() {
    ctx.fillStyle = "black"
    ctx.fillRect(125, 225, 250, 150)
    ctx.font = "60px Arial"
    ctx.fillStyle = "white"
    ctx.fillText("Game Over", 150, 300, 200)
    ctx.fillStyle = "white"
    ctx.fillText(`Score: ${score}`, 150, 350, 200)
}

const cat = new Player()
cat.y = clouds[2].y + 20
cat.x = clouds[1].x + 75
cat.render()

function gameloop() {
    if (pressedLeft) {
        cat.dx = -5
    } else if (pressedRight) {
        cat.dx = 5
    } else {
        cat.dx = 0
    }

    if ((curPlatform - 1 + 5) % 5 === prevPlatform) {
        score += 1
        prevPlatform = curPlatform
    }

    if (cat.y > canvas.height) {
        over = true
    }

    displayBackground()
    ctx.font = "40px Arial";
    ctx.fillStyle = "white"
    ctx.fillText(score, 10, 40, 100)
    renderClouds()
    cat.update()
    if (!over) {
        requestAnimationFrame(gameloop)
    } else {
        gameOverCard()
    }
}

requestAnimationFrame(gameloop)

window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case "w":
            if (!cat.isJumping) {
                cat.dy = -15
                cat.isJumping = true
            }
            break
        case "a":
            pressedLeft = true
            break
        case "d":
            pressedRight = true
            break
    }
})

window.addEventListener("keyup", (e) => {
    switch(e.key) {
        case "a":
            pressedLeft = false
            break
        case "d":
            pressedRight = false
            break
    }
})