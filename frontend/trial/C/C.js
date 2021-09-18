const colors = {
  'white': new Uint8ClampedArray([255, 255, 255, 255]),
  'black': new Uint8ClampedArray([0, 0, 0, 255])
}

const height = 96
const width = 300
const margLeft = 22
const margRight = 22
const blockSize = 8
const blocksInLine = Math.floor((width - margLeft - margRight)/blockSize)
const blocksInCol = Math.floor(height/blockSize)


function drawPixel(data, i, color='black'){
  colors[color].forEach((ink, j) => {
    data[i+j] = ink
  })
}


function drawLine(data, top, left, right, color='black'){
  for (let i = (top * width + left) * 4; i < (top * width + right) * 4; i += 4){
    drawPixel(data, i, color)
  }
}


function drawLines(data, top, bottom, left, right, color='black'){
  for (let i = top; i < bottom; i++){
    drawLine(data, i, left, right, color)
  }
}


function drawBlock(data, top, left, color='black'){
  drawLines(data, top*blockSize, top*blockSize + blockSize, left*blockSize + margLeft, left*blockSize + margLeft + blockSize, color)
}


function drawSides(data, color='black'){
  drawLines(data, 0, height, 0, 4, color)
  drawLines(data, 0, height, 9, 13, color)
  drawLines(data, 0, height, 18, 22, color)
  drawLines(data, 0, height, width-4, width, color)
  drawLines(data, 0, height, width-13, width-9, color)
  drawLines(data, 0, height, width-22, width-18, color)
}

function drawCode(data, code, color='black'){
  const bits = [128, 64, 32, 16, 8, 4, 2, 1]
  let asciiCode = new Uint8ClampedArray(code.length+1)
  let endByte = 0

  for(let i = 0; i < code.length; i++){
    let charCode = code.charCodeAt(i)
    endByte = endByte ^ charCode
    asciiCode[i] = charCode;
  }
  asciiCode[asciiCode.length-1] = endByte % 255

  for (let i = 0; i < asciiCode.length && i*8 < blocksInCol * blocksInLine; i ++){
    for (let j = 0; j < 8; j++){
      if(asciiCode[i] & bits[j]){
        drawBlock(data, Math.floor((i*8+j)/blocksInLine), (i*8+j) % blocksInLine, color)
      } 
    }
  }
}

function renderBarcode(debugInfo, element) {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext("2d", {alpha: false})
  context.canvas.width = width
  context.canvas.height = height
  let imageData = context.createImageData(300, 96)
  const code = debugInfo.id + debugInfo.code.toString().padStart(3, '0') + debugInfo.message.padEnd(34, ' ')

  drawSides(imageData.data)
  context.putImageData(imageData, 0, 0);
  drawCode(imageData.data, code)

  element.appendChild(canvas)
  context.putImageData(imageData, 0, 0);
}

export {renderBarcode};