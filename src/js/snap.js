import {tween, styler, easing} from "popmotion";
import ScrollMagic from "scrollmagic";

const controller = new ScrollMagic.Controller();

//  Full page snap, homebrew JS
let sections = Array.from(document.querySelectorAll(".section"));
const viewportStyler = styler(window);

sections.forEach(section => {
  let sceneIn = new ScrollMagic.Scene({triggerElement: section, triggerHook: 0.8}).on("start end", scrollIn).addTo(controller);

  let sceneOut = new ScrollMagic.Scene({triggerElement: section, triggerHook: 0.2, offset: getSectionHeight()}).on("start end", scrollOut).addTo(controller);
});

function getSectionHeight() {
  return sections[0].clientHeight;
}

function scrollOut(event) {
  if (window.innerWidth < 768) {
    if (event.scrollDirection == "REVERSE") {
      // console.log('out')
      // console.log(event.target.triggerElement())
      // console.log(event)
      // console.log('-----')
      let currentTop = window.scrollY;
      let centerOffset = (window.innerHeight - getSectionHeight()) / 2;
      let targetTop = event.target.triggerElement().offsetTop - centerOffset;

      tween({from: currentTop, to: targetTop, duration: 400, ease: easing.easeOut}).start(v => {
        viewportStyler.set("scrollTop", v);
      });
    }
  }
}

function scrollIn(event) {
  if (window.innerWidth < 768) {
    if (event.scrollDirection == "FORWARD") {
      // console.log('in')
      // console.log(event.target.triggerElement())
      // console.log(event)
      // console.log('-----')
      let currentTop = window.scrollY;
      let centerOffset = (window.innerHeight - getSectionHeight()) / 2;
      let targetTop = event.target.triggerElement().offsetTop - centerOffset;

      tween({from: currentTop, to: targetTop, duration: 400, ease: easing.easeOut}).start(v => {
        viewportStyler.set("scrollTop", v);
      });
    }
  }
}