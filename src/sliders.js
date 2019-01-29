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
    
    const siema = new Siema({
      selector: slider,
      duration: 200,
      easing: "ease-out",
      perPage: perPage,
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      threshold: 20,
      loop: loop,
      rtl: false,
      onInit: () => {},
      onChange: () => {}
    })

    btnPrev.onclick = event => {
      siema.prev()
    }
    btnNext.onclick = event => {
      siema.next()
    }
  })

  let siemaTriangles = Array.from(
    document.getElementsByClassName("siema-triangle")
  )

  siemaTriangles.forEach(triangle => {
    const slider = triangle.querySelector(".siema-slider")

    const siema = new Siema({
      selector: slider,
      duration: 400,
      easing: "ease-out",
      perPage: 1,
      startIndex: 0,
      draggable: false,
      loop: true,
      rtl: false,
      onInit: () => {},
      onChange: () => {}
    })

    setInterval(() => siema.prev(), 2000)
  })

  // siemaWrappers.forEach((element) => {
  //   const sliderChild = element.querySelector(".siema-slider > div")
    
  //   let num = sliderChild.children.length

  //   sliderChild.style.width = element.clientWidth * num + 'px'
  // })

  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 100)
})()
