import zenscroll from 'zenscroll'

let zenButtons = Array.from(document.getElementsByClassName('zenscroll'))

if (zenButtons) {
  let sections = Array.from(document.getElementsByClassName('section'))

  zenButtons.forEach((zen) => {
    
    zen.onclick = () => {
      if (zen.getAttribute('data-direction') === 'up') {
        zenscroll.to(sections[0], 2000)
      } else {
        zenscroll.to(sections[1], 400)
      }
    }
  })
}