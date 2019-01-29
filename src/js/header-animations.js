import {
  chain,
  keyframes,
  spring,
  styler,
  easing
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