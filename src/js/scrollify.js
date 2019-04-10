import jQuery from 'jquery'
import scrollify from 'jquery-scrollify'

jQuery(function() {
  if (window.innerWidth > 767) {
    jQuery.scrollify({
      section : '.section',
      easing: "easeOutExpo",
      scrollSpeed: 1100,
      offset : 0,
      scrollbars: true,
      setHeights: false,
      overflowScroll: true,
      updateHash: true,
      touchScroll:true,
    });
  }
});

let triggers = Array.from(document.getElementsByClassName('scrollify'))
let sections = Array.from(document.getElementsByClassName('section'))

if (triggers) {
  triggers.forEach((trigger) => {
    trigger.onclick = (event) => {
      if (trigger.getAttribute('data-direction') === 'up') {
        scrollify.move('#1')
      } 
      else if (trigger.getAttribute('data-direction') === 'bottom') {
        let lastSection = '#' + sections.length
        scrollify.move(lastSection)
      }    
      else {
        scrollify.move('#2')
      }
    }
  })
}