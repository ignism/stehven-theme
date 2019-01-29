import _ from 'lodash'

(function () {
  let menuWrapper = document.getElementById('menu-wrapper')
  let menu = document.getElementById('menu')
  let burger = document.getElementById('burger')

  let currOffset = 0
  let prevOffset = 0
  let startOffset = 0
  let endOffset = 0
  let threshold = window.innerHeight / 2
  let tickerDown = 0
  let tickerUp = 0

  let init = () => {
    menu.style.width = menuWrapper.clientWidth + 'px'
    menu.style.top = 0
  }

  init()

  burger.onclick = (event) => {
    menu.classList.toggle('active')
  }

  window.onmousemove = (event) => {
    if (event.clientY < 20) {
      showMenu()
    }
  }

  window.addEventListener('resize', _.debounce(() => {
    threshold = window.innerHeight / 2
    menu.style.width = menuWrapper.clientWidth + 'px'
  }, 100))

  window.addEventListener('scroll', (event) => {
    currOffset = window.scrollY
    
    if (prevOffset < currOffset) {
      if (tickerDown === 0) {
        startOffset = currOffset
      }
      tickerDown++
      tickerUp = 0
    } else {
      if (tickerUp === 0) {
        startOffset = currOffset
      }
      tickerDown = 0
      tickerUp++
    }
    
    if (tickerDown > 0) {
      hideMenu()
    } else if (tickerUp > 0) {
      if (Math.abs(startOffset - currOffset) > threshold) {
        // Lets not show
        // showMenu()
      }
    }
    
    prevOffset = currOffset
  })
  

  function hideMenu() {
    menu.style.top = '-' + menu.clientHeight + 'px'
    menu.classList.remove('active')
  }

  function showMenu() {
    menu.style.top = 0
  }
})()