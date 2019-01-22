(function () {
  let menu = document.getElementById('menu')
  let container = document.getElementById('scroll-container')
  let currOffset = 0
  let prevOffset = 0
  let startOffset = 0
  let endOffset = 0
  let threshold = window.innerHeight / 2
  let tickerDown = 0
  let tickerUp = 0

  container.onscroll = (event) => {
    currOffset = container.scrollTop

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
        showMenu()
      }
    }

    prevOffset = currOffset
  }

  function hideMenu() {
    menu.style.top = '-' + menu.clientHeight + 'px'
  }

  function showMenu() {
    menu.style.top = 0
  }
})()