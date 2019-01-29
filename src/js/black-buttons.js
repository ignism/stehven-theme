import {
  tween,
  easing,
  styler
} from "popmotion";

if (document.body.classList.contains('page-template-page-front')) {
  let ratio = {
    w: 617,
    h: 836,
    r: 617 / 836
  }

  //236 / 691
  // 256 X 238 (w = 756)

  let mobileView = 768

  let supportWrapper = document.getElementById('support-wrapper')
  let hereWrapper = document.getElementById('here-wrapper')
  let hereButton = hereWrapper.querySelector('img')
  let hereStyler = new styler(hereButton)

  new tween({
    from: 0,
    to: {
      rotate: 360
    },
    duration: 8000,
    loop: Infinity,
    ease: easing.linear,
  }).start(hereStyler.set)


  window.addEventListener('resize', _.debounce(() => {
    if (supportWrapper.clientWidth / supportWrapper.clientHeight < ratio.r) {
      // full width
      let w = supportWrapper.clientWidth
      let h = supportWrapper.clientWidth * ratio.h / ratio.w
      let mt = (supportWrapper.clientHeight - h) / 2

      hereWrapper.style.width = w + 'px'
      hereWrapper.style.height = h + 'px'
      hereWrapper.style.marginTop = mt + 'px'
    } else {
      // full height
      let w = supportWrapper.clientHeight * ratio.w / ratio.h
      let h = supportWrapper.clientHeight

      hereWrapper.style.width = w + 'px'
      hereWrapper.style.height = h + 'px'
      hereWrapper.style.marginTop = 0
    }

    hereButton.style.width = hereWrapper.clientWidth * 0.32 + 'px'
  }, 10))
}

if (document.body.classList.contains('page-template-page-ask')) {
  let submitButton = document.getElementById('submit-button')
  let submitStyler = styler(submitButton)


  new tween({
    from: 0,
    to: {
      rotate: 360
    },
    duration: 8000,
    loop: Infinity,
    ease: easing.linear,
  }).start(submitStyler.set)
}