const canvas = document.querySelector("canvas")
const WIDTH = 500
const HEIGHT = 700
const GRAVITY = 0.9
canvas.width = WIDTH
canvas.height = HEIGHT
const ctx = canvas.getContext("2d")
ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

function displayBackground() {
    ctx.fillStyle = "black"
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
    }

    render() {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.y += this.dy
        this.x += this.dx
        this.dy += GRAVITY

        clouds.forEach((cloud) => {
            if (this.collide(cloud)) {
                this.y = cloud.y - this.height
                this.dy = 0
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
        return true
    }
}

class Platform {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.dx = 0
        this.dy = 0
        this.height = 10
        this.width = 200
    }

    render() {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const cloud1 = new Platform(50, 600)
const cloud2 = new Platform(50, 500)
const cloud3 = new Platform(50, 400)
const cloud4 = new Platform(50, 300)
const cloud5 = new Platform(50, 200)

const clouds = [
    cloud1,
    cloud2,
    cloud3,
    cloud4,
    cloud5
]

function renderClouds() {
    clouds.forEach((cloud) => {
        cloud.render()
    })
}

const cat = new Player()
cat.render()

function gameloop() {
    displayBackground()
    cat.update()
    renderClouds()
    requestAnimationFrame(gameloop)
}

requestAnimationFrame(gameloop)