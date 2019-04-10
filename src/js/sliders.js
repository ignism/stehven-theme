import Siema from "siema"

;(function() {
  let siemaWrappers = Array.from(
    document.getElementsByClassName("siema-wrapper")
  )

  siemaWrappers.forEach(wrapper => {
    const slider = wrapper.querySelector(".siema-slider")
    const btnPrev = wrapper.querySelector(".siema-controls .btn-prev")
    const btnNext = wrapper.querySelector(".siema-controls .btn-next")
    const perPage = parseInt(wrapper.getAttribute('data-per-page'))
    const loop = parseInt(wrapper.getAttribute('data-loop'))
    const draggable = parseInt(wrapper.getAttribute('data-draggable'))
    const navigationClass = wrapper.getAttribute('data-navigation-class')
    
    const siema = new Siema({
      selector: slider,
      duration: 400,
      easing: 'ease-in-out',
      perPage: perPage,
      startIndex: 0,
      draggable: draggable,
      multipleDrag: true,
      threshold: 20,
      loop: loop,
      rtl: false,
      onInit: () => {},
      onChange: () => {}
    })

    if (btnNext && btnPrev) {
      btnPrev.onclick = event => {
        siema.prev()
      }
      btnNext.onclick = event => {
        siema.next()
      }
    }

    if (navigationClass) {
      let navigationItems = Array.from(document.getElementsByClassName(navigationClass))

      let index = 0;
  
      let navOptionInterval = window.setInterval(() => {
        index++;
        
        let navigationItems = Array.from(document.getElementsByClassName(navigationClass))
        if (index == navigationItems.length) index = 0;

        siema.goTo(index)
        disableOptions()
        navigationItems[index].classList.add('active')
      
      }, 6000)

      for (let i = 0; i < navigationItems.length; i++) {
        let item = navigationItems[i]

        item.addEventListener('mouseover', (event) => {
          if(navOptionInterval) {
            window.clearInterval(navOptionInterval)
          }
          disableOptions()
          item.classList.add('active')
          item.classList.add('mouseover')
          siema.goTo(i)
        })

        item.addEventListener('touchstart', (event) => {
          disableOptions()

          item.classList.add('active')
          item.classList.add('mouseover')
          siema.goTo(i)
        })

        item.addEventListener('mouseout', (event) => {
          navOptionInterval = window.setInterval(() => {
            index++;
            
            let navigationItems = Array.from(document.getElementsByClassName(navigationClass))
            if (index == navigationItems.length) index = 0;
    
            siema.goTo(index)
            disableOptions()
            navigationItems[index].classList.add('active')
          
          }, 6000)
        })
      }

      function disableOptions() {
        navigationItems.forEach((item) => {
          item.classList.remove('active')
          item.classList.remove('mouseover')
        })
      }

      if (navigationClass == 'ask-option') {
        
      }
    }
  })

  let siemaTriangles = Array.from(
    document.getElementsByClassName("siema-triangle")
  )

  siemaTriangles.forEach(triangle => {
    const slider = triangle.querySelector(".siema-slider")

    const siema = new Siema({
      selector: slider,
      duration: 800,
      easing: 'cubic-bezier(0.000, 0.333, 0.000, 1.0)',
      perPage: 1,
      startIndex: 0,
      draggable: false,
      loop: true,
      rtl: false,
      onInit: () => {},
      onChange: () => {}
    })

    if (triangle.getAttribute('data-direction') === 'left') {
      setInterval(() => siema.next(), 2000)
    } else {
      setInterval(() => siema.prev(), 2000)
    }

  })

  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 100)
})()
