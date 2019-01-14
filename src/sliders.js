import Siema from 'siema';

let siemaWrappers = Array.from(document.getElementsByClassName('siema-wrapper'))

siemaWrappers.forEach((wrapper) => {
  const slider = wrapper.querySelector('.siema-slider')
  const btnPrev = wrapper.querySelector('.siema-controls .btn-prev')
  const btnNext = wrapper.querySelector('.siema-controls .btn-next')
  
  const siema = new Siema({
    selector: slider,
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: true,
    rtl: false,
    onInit: () => {},
    onChange: () => {},
  });

  btnPrev.onclick = (event) => {
    siema.prev()
  }
  btnNext.onclick = (event) => {
    siema.next()
  }
})