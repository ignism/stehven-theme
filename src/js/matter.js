import Matter from "matter-js"
import _ from "lodash"
import ScrollMagic from 'scrollmagic'

const animationElement = document.getElementById("matter-animation")

let firstTime = true;

if (animationElement) {
  let controller = new ScrollMagic.Controller()

  new ScrollMagic.Scene({
    triggerElement: animationElement,
    triggerHook: 0,
    duration: window.innerHeight
  }).on("progress", reset).addTo(controller)

  let debug = document.getElementById("debug")
  let frame = document.getElementById("frame")
  let divs = []
  divs.push(document.getElementById("charB"))
  divs.push(document.getElementById("charE1"))
  divs.push(document.getElementById("charE2"))
  divs.push(document.getElementById("charR"))
  divs.push(document.getElementById("charS"))
  divs.push(document.getElementById("boxNot"))
  divs.push(document.getElementById("boxJust"))

  // project variables
  const ratio = {
    world: {
      width: 720,
      height: 1100
    },
    boxNot: {
      width: 194.4,
      height: 152
    },
    boxJust: {
      width: 254.8,
      height: 152
    },
    charB: {
      width: 153,
      height: 372
    },
    charE: {
      width: 131.5,
      height: 372
    },
    charR: {
      width: 153.5,
      height: 372
    },
    charS: {
      width: 153,
      height: 379.5
    }
  }

  let world = {
    width: frame.clientWidth,
    height: frame.clientHeight,
    prevWidth: frame.clientWidth,
    prevHeight: frame.clientHeight
  }

  // module aliases
  const Engine = Matter.Engine
  const Render = Matter.Render
  const World = Matter.World
  const Bodies = Matter.Bodies
  const Body = Matter.Body

  // create an engine
  let engine = Engine.create()

  var render = Render.create({
    element: debug,
    engine: engine,
    options: {
      width: world.width,
      height: world.height
    }
  })

  let chars = []

  chars.push({
    char: "B",
    body: Bodies.rectangle(
      world.width / 8,
      world.height / 8,
      ratio.charB.width * calcScale(),
      ratio.charB.height * calcScale()
    )
  })

  chars.push({
    char: "E",
    body: Bodies.rectangle(
      world.width / 8,
      world.height / 8,
      ratio.charE.width * calcScale(),
      ratio.charE.height * calcScale()
    )
  })

  chars.push({
    char: "E",
    body: Bodies.rectangle(
      world.width / 8,
      world.height / 8,
      ratio.charE.width * calcScale(),
      ratio.charE.height * calcScale()
    )
  })

  chars.push({
    char: "R",
    body: Bodies.rectangle(
      world.width / 8,
      world.height / 8,
      ratio.charR.width * calcScale(),
      ratio.charR.height * calcScale()
    )
  })

  chars.push({
    char: "S",
    body: Bodies.rectangle(
      world.width / 4,
      world.height / 4,
      ratio.charS.width * calcScale(),
      ratio.charS.height * calcScale()
    )
  })

  // box elemenet
  let boxNot = Bodies.rectangle(
    (ratio.boxNot.width * calcScale()) / 2,
    world.height -
    ratio.boxJust.height * calcScale() -
    (ratio.boxNot.height * calcScale()) / 2,
    ratio.boxNot.width * calcScale(),
    ratio.boxNot.height * calcScale(), {
      isStatic: true
    }
  )

  let boxJust = Bodies.rectangle(
    (ratio.boxJust.width * calcScale()) / 2,
    world.height - (ratio.boxJust.height * calcScale()) / 2,
    ratio.boxJust.width * calcScale(),
    ratio.boxJust.height * calcScale(), {
      isStatic: true
    }
  )

  // create walls
  let wallTop = Bodies.rectangle(world.width / 2, -4, world.width, 8, {
    isStatic: true
  })

  let wallBottom = Bodies.rectangle(
    world.width / 2,
    world.height + 4,
    world.width,
    8, {
      isStatic: true
    }
  )

  let wallLeft = Bodies.rectangle(-4, world.height / 2, 8, world.height, {
    isStatic: true
  })

  let wallRight = Bodies.rectangle(
    world.width + 4,
    world.height / 2,
    8,
    world.height, {
      isStatic: true
    }
  )

  // add all of the bodies to the world
  World.add(engine.world, [
    boxNot,
    boxJust,
    wallTop,
    wallBottom,
    wallLeft,
    wallRight
  ])

  function addChars() {
    for (let i = 0; i < chars.length; i++) {
      window.setTimeout(() => {
        chars[i].body.friction = 0.005
        chars[i].body.frictionAir = 0.005
        chars[i].body.restitution = 0.005
        Body.setAngularVelocity(
          chars[chars.length - 1 - i].body,
          Math.random() * 0.05 - 0.1
        )
        Body.setVelocity(
          chars[chars.length - 1 - i].body,
          Matter.Vector.create(Math.random() * 2 + 4, Math.random() * 8 - 8)
        )
        World.addBody(engine.world, chars[chars.length - 1 - i].body)
        divs[chars.length - 1 - i].style.opacity = 1
      }, 800 * (i + 1))
    }
  }

  // addChars()

  // run the engine
  Engine.run(engine)

  // run the renderer
  Render.run(render)

  resizeWorld()

  // helper functions
  function resizeBox(body, scale) {
    let vertices = Array.from(body.vertices)

    vertices[0].x *= scale
    vertices[0].y *= scale
    vertices[1].x *= scale
    vertices[1].y *= scale
    vertices[2].x *= scale
    vertices[2].y *= scale
    vertices[3].x *= scale
    vertices[3].y *= scale

    Body.setVertices(body, vertices)

    console.log(body)
  }

  function calcScale() {
    let frameVector = Matter.Vector.create(world.width, world.height)
    let worldVector = Matter.Vector.create(
      ratio.world.width,
      ratio.world.height
    )

    let frameRatio = Matter.Vector.magnitude(frameVector)
    let worldRatio = Matter.Vector.magnitude(worldVector)
    let scale = frameRatio / worldRatio

    return scale
  }

  function resizeWorld() {
    world.prevWidth = world.width
    world.prevHeight = world.height

    world.width = frame.clientWidth
    world.height = frame.clientHeight

    render.canvas.width = world.width
    render.canvas.height = world.height

    resetWall(wallTop, world.width, 8, false)
    resetWall(wallBottom, world.width, 8, true)
    resetWall(wallLeft, 8, world.height, false)
    resetWall(wallRight, 8, world.height, true)

    resetBoxJust()
    resetBoxNot()

    resizeRenderer()
  }

  function resetBoxNot() {
    let worldVector = Matter.Vector.create(world.width, world.height)
    let prevVector = Matter.Vector.create(world.prevWidth, world.prevHeight)
    let scale =
      Matter.Vector.magnitude(worldVector) / Matter.Vector.magnitude(prevVector)

    let vertices = Array.from(boxNot.vertices)
    vertices[0].x *= scale
    vertices[0].y *= scale
    vertices[1].x *= scale
    vertices[1].y *= scale
    vertices[2].x *= scale
    vertices[2].y *= scale
    vertices[3].x *= scale
    vertices[3].y *= scale

    let w = boxNot.vertices[1].x - boxNot.vertices[0].x
    let h = boxNot.vertices[3].y - boxNot.vertices[0].y
    let hj = boxJust.vertices[3].y - boxJust.vertices[0].y
    let ml = 48
    let mb = 24

    Body.setVertices(boxNot, vertices)
    Body.setPosition(
      boxNot,
      Matter.Vector.create(w / 2 + ml, world.height - hj - h / 2 - mb)
    )
  }

  function resetBoxJust() {
    let worldVector = Matter.Vector.create(world.width, world.height)
    let prevVector = Matter.Vector.create(world.prevWidth, world.prevHeight)
    let scale =
      Matter.Vector.magnitude(worldVector) / Matter.Vector.magnitude(prevVector)

    let vertices = Array.from(boxJust.vertices)
    vertices[0].x *= scale
    vertices[0].y *= scale
    vertices[1].x *= scale
    vertices[1].y *= scale
    vertices[2].x *= scale
    vertices[2].y *= scale
    vertices[3].x *= scale
    vertices[3].y *= scale

    let w = boxJust.vertices[1].x - boxJust.vertices[0].x
    let h = boxJust.vertices[3].y - boxJust.vertices[0].y
    let ml = 48
    let mb = 24

    Body.setVertices(boxJust, vertices)
    Body.setPosition(boxJust, Matter.Vector.create(w / 2 + ml, world.height - h / 2 - mb))
  }

  function resetWall(body, width, height, hasOffset) {
    let vertices = Array.from(body.vertices)
    let position = Matter.Vector.create(0, 0)

    if (width > height) {
      let scale = world.width / world.prevWidth
      let offset = hasOffset ? world.height - world.prevHeight : 0

      vertices[0].y += offset
      vertices[1].x *= scale
      vertices[1].y += offset
      vertices[2].x *= scale
      vertices[2].y += offset
      vertices[3].y += offset
      position = hasOffset ?
        Matter.Vector.create(world.width / 2, world.height + height / 2) :
        Matter.Vector.create(world.width / 2, -height / 2)
    } else {
      let scale = world.height / world.prevHeight
      let offset = hasOffset ? world.width - world.prevWidth : 0

      vertices[0].x += offset
      vertices[1].x += offset
      vertices[2].x += offset
      vertices[2].y *= scale
      vertices[3].x += offset
      vertices[3].y *= scale
      position = hasOffset ?
        Matter.Vector.create(world.width + width / 2, world.height / 2) :
        Matter.Vector.create(-width / 2, world.height / 2)
    }

    Body.setVertices(body, vertices)
    Body.setPosition(body, position)
  }

  // events
  window.addEventListener('resize', _.debounce(() => {
    resizeWorld()
  }, 100))

  function reset() {
    if (firstTime) {
      addChars()
      firstTime = false;
    } else {
      if (chars) {
        chars.forEach(char => {
          hussle(char.body)
        })
      }
    }
  }

  const update = () => {
    chars.forEach(char => {
      if (isOffScreen(char.body)) {
        place(char.body)
      }
    })

    for (let i = 0; i < chars.length; i++) {
      renderElementFromBody(divs[i], chars[i].body)
    }
    renderElementFromBody(divs[5], boxNot)
    renderElementFromBody(divs[6], boxJust)
    window.requestAnimationFrame(update)
  }

  function place(body) {
    if (body) {
      Body.setAngularVelocity(body, Math.random() * 0.1 - 0.05)
      Body.setVelocity(body, Matter.Vector.create(Math.random(), Math.random()))
      Body.setPosition(
        body,
        Matter.Vector.create(world.width / 2, world.height / 4)
      )
    }
  }

  function hussle(body) {
    Body.setAngularVelocity(body, Math.random() * 0.1 - 0.05)
    Body.setVelocity(body, Matter.Vector.create(Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05))
  }

  function placeOffScreen(body) {
    Body.setAngularVelocity(body, Math.random() * 0.1 - 0.05)
    Body.setVelocity(body, Matter.Vector.create(Math.random(), Math.random()))
    Body.setPosition(
      body,
      Matter.Vector.create(world.width * -2, world.height / 4)
    )
  }

  function isOffScreen(body) {
    if (body.position.x < 0 || body.position.x > world.width) {
      return true
    }

    if (body.position.y < 0 || body.position.y > world.height) {
      return true
    }

    return false
  }

  function resizeRenderer() {}

  function renderElementFromBody(element, body) {
    let lt = Matter.Vector.create(body.vertices[0].x, body.vertices[0].y)
    let rt = Matter.Vector.create(body.vertices[1].x, body.vertices[1].y)
    let lb = Matter.Vector.create(body.vertices[3].x, body.vertices[3].y)

    let w = Matter.Vector.magnitude(Matter.Vector.sub(lt, rt))
    let h = Matter.Vector.magnitude(Matter.Vector.sub(lt, lb))

    element.style.width = w + "px"
    element.style.height = h + "px"

    element.style.left = body.position.x - element.clientWidth / 2 + "px"
    element.style.top = body.position.y - element.clientHeight / 2 + "px"
    element.style.transform = "rotate(" + body.angle + "rad)"
  }
  window.requestAnimationFrame(update)
}