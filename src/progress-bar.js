import _ from 'lodash'

(function() {
  let bar = document.getElementById('progress-bar')
  let progress = bar.querySelector('.progress')
  let sections = Array.from(document.getElementsByClassName('section'))

  if (bar) {
    progress.style.height = bar.clientHeight / sections.length + 'px'
  }

  window.addEventListener('scroll', _.debounce((event) => {
    let minDistance = Infinity
    let activeSection = sections[0]
    let index = 0
    bar.style.opacity = 1

    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('active')

      let distance = Math.abs(sections[i].offsetTop - window.scrollY)

      if (distance < minDistance) {
        minDistance = distance
        activeSection = sections[i]
        index = i
      }
    }

    activeSection.classList.add('active')
    progress.style.top = progress.clientHeight * index + 'px'
  }, 400))

})()