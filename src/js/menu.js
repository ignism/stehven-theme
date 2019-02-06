import _ from 'lodash'

(function () {
  let menuWrapper = document.getElementById('menu-wrapper')
  let menu = document.getElementById('menu')
  let burger = document.getElementById('burger')
  let burgerMobile = document.getElementById('burger-mobile')

  let currOffset = 0
  let prevOffset = 0
  let startOffset = 0
  let endOffset = 0
  let threshold = 96 // window.innerHeight / 8
  let tickerDown = 0
  let tickerUp = 0
  let triggeredByMouse = false;

  let init = () => {
    menu.style.width = menuWrapper.clientWidth + 'px'
    menu.style.top = 0
  }

  init()

  burger.onclick = (event) => {
    menu.classList.toggle('active')
    showMenu()
  }

  burgerMobile.onclick = (event) => {
    menu.classList.toggle('active')
    showMenu()
  }

  window.onmousemove = (event) => {
    if (event.clientY < 96) {
      showMenu()
      triggeredByMouse = true;
    }

    if (event.clientY > window.innerHeight / 3) {
      if (triggeredByMouse) {
        hideMenu()
      }
    }
  }

  let sections = document.getElementsByClassName('section')

    if (sections[sections.length - 1].classList.contains('bg-white')) {
      if (Math.abs(currOffset - sections[sections.length - 1].offsetTop) < 100) {
        burger.classList.add('invert')
        burger.classList.add('white')
      } else {
        burger.classList.remove('invert')
      }
    }


  window.addEventListener('resize', _.debounce(() => {
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
      // console.log(tickerUp)
    }
    
    if (tickerDown > 10) {
      // hideMenu()
      if (Math.abs(startOffset - currOffset) > threshold) {
        hideMenu()
      }
    } else if (tickerUp > 0) {
      // showMenu()
      // console.log(threshold + ':' + Math.abs(startOffset - currOffset))
      if (Math.abs(startOffset - currOffset) > threshold) {
        // NAAAAAHHHH showMenu()
      }
    }
    
    prevOffset = currOffset

    let sections = document.getElementsByClassName('section')

    if (sections[sections.length - 1].classList.contains('bg-white')) {
      if (Math.abs(currOffset - sections[sections.length - 1].offsetTop) < 100) {
        burger.classList.add('invert')
      } else {
        burger.classList.remove('invert')
      }
    }
  })
  

  function hideMenu() {
    menu.style.top = '-' + menu.clientHeight + 'px'
    menu.classList.remove('active')
    burger.classList.remove('white')
  }

  function showMenu() {
    // menu.classList.add('active')
    menu.style.top = 0
    burger.classList.add('white')
  }
})()