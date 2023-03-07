const canvasEl = document.querySelector('.main canvas')
const selectToolsEl = document.querySelector('.toolbar .tools')
const brushSizeInput = document.querySelector('.size-panel input[type="range"]')
const brushPriviewCircle = document.querySelector('.size-panel .size__preview .preview__circle span')
const brushPriviewSize = document.querySelector('.size-panel .size__preview .preview__size')
const brushColorInput = document.querySelector('.color-picker input[type="color"]')
const canvasClearEl = document.querySelector('.toolbar .menus .clear')
const undoEl = document.querySelector('.toolbar .menus .undo')
const minimapToggleInputEl = document.querySelector('.toolbar .toggle-map label input[type="checkbox"]')
const minimapContainerEl = document.querySelector('.main .mini-map')
const minimapImgEl = document.querySelector('.main .mini-map img')
const saveEl = document.querySelector('.toolbar .menus .download')
const colorsEl = document.querySelector('.toolbar .color-picker .colors')

const context = canvasEl.getContext("2d")
let history = []

let sX = null
let sY = null

let mode = "brush"
let IsMouseDown = false

clearCanvas()
selectToolsEl.addEventListener('change', e => {
  mode = e.target.value
})

canvasEl.addEventListener('mousedown', e => {
  saveState()

  IsMouseDown = true
  const currentPosition = getMousePosition(e)
  sX = currentPosition.x
  sY = currentPosition.y
  context.beginPath() // 경로시작
  context.lineCap = 'round' // 브러시 끝 모양
  context.lineJoin = 'round' // 선과 선이 만났을때의 모서리
  context.lineWidth = brushSizeInput.value // 라인두께
  context.moveTo(currentPosition.x, currentPosition.y) //해당 좌표부터 라인을 그림
  if (mode === "eraser") {
    context.strokeStyle = '#fff' // 브러시 색
  } else {
    context.strokeStyle = brushColorInput.value // 브러시 색
  }
})

canvasEl.addEventListener('mousemove', e => {
  if (!IsMouseDown) return;
  const currentPosition = getMousePosition(e) 

  if(mode === 'brush') {    
    context.lineTo(currentPosition.x, currentPosition.y) //선이 향하는 좌표
  } else if (mode === 'eraser') {
    context.lineTo(currentPosition.x, currentPosition.y) //선이 향하는 좌표
  } else if (mode === 'rect') {
    let previousImg = new Image();
    let prevDataUrl = history.at(-1)
    
    previousImg.addEventListener('load', () => {
      context.drawImage(previousImg, 0, 0, canvasEl.width, canvasEl.height, 0, 0, canvasEl.width, canvasEl.height)
      context.strokeRect(sX, sY, currentPosition.x - sX, currentPosition.y - sY)
    })
    previousImg.src = prevDataUrl;
  }
  context.stroke() //동작
})

canvasEl.addEventListener('mouseup',() => {
  if(!IsMouseDown) return;

  updateMinimap()
  IsMouseDown = false
})

canvasEl.addEventListener('mouseout', () => {
  if(!IsMouseDown) return;

  updateMinimap()
  IsMouseDown = false
})

brushSizeInput.addEventListener('input', () => {
  brushPriviewCircle.style.width = `${brushSizeInput.value}px`
  brushPriviewCircle.style.height = `${brushSizeInput.value}px`
  brushPriviewSize.textContent = brushSizeInput.value
})

brushColorInput.addEventListener('input', () => {
  brushPriviewCircle.style.backgroundColor = brushColorInput.value
})

minimapToggleInputEl.addEventListener('change', e => {
  if (e.target.checked) {
    updateMinimap()
    minimapContainerEl.classList.remove('hide')
  } else {
    minimapContainerEl.classList.add('hide')
  }
})

undoEl.addEventListener('click', () => {
  if(history.length === 0) return;

  let previousImg = new Image();
  let prevDataUrl = history.pop()
  
  previousImg.addEventListener('load', () => {
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    context.drawImage(previousImg, 0, 0, canvasEl.width, canvasEl.height, 0, 0, canvasEl.width, canvasEl.height)
    updateMinimap()
  })
  previousImg.src = prevDataUrl;
})

canvasClearEl.addEventListener('click', () => {
  clearCanvas()
  history = [];
})

saveEl.addEventListener('click', () => {
  saveEl.href = canvasEl.toDataURL("image/png",1)
  saveEl.download = "my_artwork.png"
})

window.addEventListener('keydown', (e) => {
  if(e.ctrlKey && e.key === 'z') undoEl.click()
})

colorsEl.addEventListener('click', e => {
  if (e.target.dataset.color) {
    brushColorInput.value = e.target.dataset.color
    brushPriviewCircle.style.backgroundColor = e.target.dataset.color
  }
})

function clearCanvas() {
  context.fillStyle = '#fff'
  context.fillRect(0, 0, canvasEl.width, canvasEl.height)
  updateMinimap()
}

function getMousePosition(e) {
  const boundarise = canvasEl.getBoundingClientRect();
  return {
    x: e.clientX - boundarise.left,
    y: e.clientY - boundarise.top
  }
}

function updateMinimap() {
  if (minimapToggleInputEl.checked) {
    minimapImgEl.src = canvasEl.toDataURL()
  }
}

function saveState() {
  if(history.length > 15) {
    history.shift();
    history.push(canvasEl.toDataURL());
  } else {
    history.push(canvasEl.toDataURL());
  }
}

Array.from(colorsEl.children).forEach((color) => {
  color.style.backgroundColor = color.dataset.color
})