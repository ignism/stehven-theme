import zenscroll from 'zenscroll'
import ScrollMagic from 'scrollmagic'

const controller = new ScrollMagic.Controller();

//  Full page snap, homebrew JS
let sections = Array.from(document.querySelectorAll('.section'))

sections.forEach((section) => {
  let offset = section.clientHeight

  let sceneTop = new ScrollMagic.Scene({
    triggerElement: section, 
    triggerHook: 0.9,
    offset: 0
  }).on("enter", callback)
    .addTo(controller)

  let sceneBottom = new ScrollMagic.Scene({
    triggerElement: section, 
    triggerHook: 0.1,
    offset: offset
  }).on("leave" , callback)
    .addTo(controller)
})

function callback (event) {
  if (event.type === "enter" && event.scrollDirection == "FORWARD") {
    zenscroll.to(event.target.triggerElement())
  }

  if (event.type === "leave" && event.scrollDirection == "REVERSE") {
    zenscroll.to(event.target.triggerElement())
  }
}
