import {
  chain,
  keyframes,
  spring,
  styler,
  easing,
  tween,
  timeline
} from "popmotion"
import {
  buildStyleProperty
} from "stylefire";

if (document.body.classList.contains('page-template-page-front')) {
  const askStyler = styler(document.getElementById("header-ask"))
  const askKeyframes = keyframes({
    values: [{
        x: "-25%",
        opacity: 0
      },
      {
        x: "0%",
        opacity: 1
      },
      {
        x: "0%",
        opacity: 1
      },
      {
        x: "100%",
        opacity: 0
      },
    ],
    times: [0, 0.2, 0.8, 1],
    ease: easing.linear,
    duration: 2000
  })

  const meetStyler = styler(document.getElementById("header-meet"))
  const meetKeyframes = keyframes({
    values: [{
        x: "-25%",
        opacity: 0
      },
      {
        x: "0%",
        opacity: 1
      },
      {
        x: "0%",
        opacity: 1
      },
      {
        x: "100%",
        opacity: 0
      },
    ],
    times: [0, 0.2, 0.8, 1],
    ease: easing.linear,
    duration: 2000
  })

  const joinStyler = styler(document.getElementById("header-join"))
  const joinKeyframes = keyframes({
    values: [{
        x: "-25%",
        opacity: 0
      },
      {
        x: "0%",
        opacity: 1
      },
      {
        x: "0%",
        opacity: 1
      },
      {
        x: "100%",
        opacity: 0
      },
    ],
    times: [0, 0.2, 0.8, 1],
    ease: easing.linear,
    duration: 2000
  })

  const headerStyler = styler(document.getElementById("section-header"))
  const headerKeyframes = keyframes({
    values: [{
        background: "#14B978"
      }, // 0
      {
        background: "#9854FC"
      }, // 0.06667
      {
        background: "#9854FC"
      }, // 0.33333
      {
        background: "#46D5FF"
      }, // 0.4
      {
        background: "#46D5FF"
      }, // 0.66667
      {
        background: "#14B978"
      }, // 0.73333
      {
        background: "#14B978"
      }, // 1
    ],
    times: [0, 0.06667, 0.33333, 0.4, 0.66667, 0.73333, 1],
    easings: easing.linear,
    duration: 6000,
    loop: Infinity
  })

  headerKeyframes.start(v => headerStyler.set(v))

  askKeyframes.start({
    update: v => askStyler.set(v),
    complete: () => {
      meetKeyframes.start({
        update: v => meetStyler.set(v),
        complete: () => {
          joinKeyframes.start({
            update: v => joinStyler.set(v),
            complete: () => {}
          })
        }
      })
    }
  })

  setInterval(() => {
    askKeyframes.start({
      update: v => askStyler.set(v),
      complete: () => {
        meetKeyframes.start({
          update: v => meetStyler.set(v),
          complete: () => {
            joinKeyframes.start({
              update: v => joinStyler.set(v),
              complete: () => {}
            })
          }
        })
      }
    })
  }, 6000)

}

if (document.getElementById("header-triangle")) {
  console.log('tick')
  const headerStyler = styler(document.getElementById("header-triangle"))
  console.log(headerStyler)
  const headerKeyframes = keyframes({
    values: [{
        color: "#fd4635",
        background: "#46D5FF"
      }, // 0
      {
        color: "#14B978",
        background: "#9854FC"
      }, // 0.06667
      {
        color: "#14B978",
        background: "#9854FC"
      }, // 0.33333
      {
        color: "#9854FC",
        background: "#fd4635"
      }, // 0.4
      {
        color: "#9854FC",
        background: "#fd4635"
      }, // 0.66667
      {
        color: "#fd4635",
        background: "#46D5FF"
      }, // 0.73333
      {
        color: "#fd4635",
        background: "#46D5FF"
      }, // 1
    ],
    times: [0, 0.06667, 0.33333, 0.4, 0.66667, 0.73333, 1],
    easings: easing.linear,
    duration: 6000,
    loop: Infinity
  })

  headerKeyframes.start(v => headerStyler.set(v))
}

const meetRed = document.getElementById('meet-red')
const meetGreen = document.getElementById('meet-green')

if (meetRed && meetGreen) {
  let fromLeftTopRed = styler(meetRed.querySelector('.from-left-top'))
  let fromLeftBottomRed = styler(meetRed.querySelector('.from-left-bottom'))
  let fromRightTopRed = styler(meetRed.querySelector('.from-right-top'))
  let fromRightBottomRed = styler(meetRed.querySelector('.from-right-bottom'))

  let fromLeftTopGreen = styler(meetGreen.querySelector('.from-left-top'))
  let fromLeftBottomGreen = styler(meetGreen.querySelector('.from-left-bottom'))
  let fromRightTopGreen = styler(meetGreen.querySelector('.from-right-top'))
  let fromRightBottomGreen = styler(meetGreen.querySelector('.from-right-bottom'))

  let slideFromLeft = tween({
    from: {
      x: '-100%'
    },
    to: 0,
    duration: 1000,
    ease: easing.easeOut
  })

  let slideFromRight = tween({
    from: {
      x: '100%'
    },
    to: 0,
    duration: 1000,
    ease: easing.easeOut
  })

  recursive();

  // setInterval(() => {
  //   recursive()
  // }, 2000)

  function recursive() {
    fromLeftTopGreen.set({
      x: '-100%'
    })
    fromLeftBottomGreen.set({
      x: '-100%'
    })
    fromRightTopGreen.set({
      x: '100%'
    })
    fromRightBottomGreen.set({
      x: '100%'
    })

    slideFromLeft.start({
      update: (v) => {
        fromLeftTopRed.set(v)
        fromLeftBottomRed.set(v)
      },
      complete: () => {
        slideFromLeft.start({
          update: (v) => {
            fromLeftTopGreen.set(v)
            fromLeftBottomGreen.set(v)
          },
          complete: () => {
            fromLeftTopRed.set({
              x: '-100%'
            })
            fromLeftBottomRed.set({
              x: '-100%'
            })
          }
        })
      }
    })

    slideFromRight.start({
      update: (v) => {
        fromRightTopRed.set(v)
        fromRightBottomRed.set(v)
      },
      complete: () => {
        slideFromRight.start({
          update: (v) => {
            fromRightTopGreen.set(v)
            fromRightBottomGreen.set(v)
          },
          complete: () => {
            fromRightTopRed.set({
              x: '100%'
            })
            fromRightBottomRed.set({
              x: '100%'
            })
            recursive()
          }
        })
      }
    })
  }
}

const eventTriangle = document.getElementById('event-triangle')

if (eventTriangle) {
  let fromTopRed = styler(eventTriangle.querySelector('.from-top-red'))
  let fromTopBlue = styler(eventTriangle.querySelector('.from-top-blue'))


  console.log(eventTriangle.querySelector('.from-top-red'))
  console.log(eventTriangle.querySelector('.from-top-blue'))

  let slideIn = tween({
    from: {
      y: '-100%'
    },
    to: {
      y: '0%'
    },
    duration: 1000,
    ease: easing.easeOut
  })

  let slideOut = tween({
    from: {
      y: '0%'
    },
    to: {
      y: '100%'
    },
    duration: 1000,
    ease: easing.easeOut
  })

  let simpleSlider = () => {
    fromTopBlue.set({
      y: '-100%'
    })
    eventTriangle.classList.remove('bg-blue')
    eventTriangle.classList.add('bg-red')

    slideIn.start(fromTopBlue.set)
    slideOut.start({
      update: (v) => {
        fromTopRed.set(v)
      },
      complete: () => {
        fromTopRed.set({
          y: '-100%'
        })
        eventTriangle.classList.remove('bg-red')
        eventTriangle.classList.add('bg-blue')
        slideIn.start(fromTopRed.set)
        slideOut.start(fromTopBlue.set)
      }
    })

  }

  simpleSlider()

  setInterval(() => {
    simpleSlider()
  }, 2000)

}

const expanders = Array.from(document.getElementsByClassName('expander-wrapper'))

if (expanders) {
  let header = document.getElementById('mobile-just-ask')

  expanders.forEach(wrapper => {
    let trigger = wrapper.querySelector('.expander-trigger')
    let content = wrapper.querySelector('.expander-content')

    trigger.onclick = (event) => {
      console.log(header)
      if (wrapper.classList.contains('active')) {
        expanders.forEach(element => {
          element.classList.remove('active')
        })
        header.style.height = '33.3333%'
      } else {
        expanders.forEach(element => {
          element.classList.remove('active')
        })
        wrapper.classList.add('active')
        header.style.height = '0%'
      }
    }
  })
}