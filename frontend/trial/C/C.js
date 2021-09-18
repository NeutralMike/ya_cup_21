const colors = {
  'white': new Uint8ClampedArray([255, 255, 255, 255]),
  'black': new Uint8ClampedArray([0, 0, 0, 255])
}

const height = 96
const width = 300
const margLeft = 22
const margRight = 22
const scale = 8
const workSpaceWidth = Math.floor((width - margLeft - margRight)/scale)
const workSpaceHeight = height / scale


function drawSides(context){
  context.fillRect(0,0, 4, 1)
  context.fillRect(9, 0, 4, 1)
  context.fillRect(18, 0, 4, 1)
}

function drawCode(context, code){
  const bits = [128, 64, 32, 16, 8, 4, 2, 1]
  let endByte = 0
  let x = 0
  let y = 0

  for(let i = 0; i < code.length; i++){
    let charCode = code.charCodeAt(i)
    endByte = endByte ^ charCode
    for (let j = 0; j < 8; j++){
      if (charCode & bits[j]){
        context.fillRect(x, y, 1, 1)
      }
      x += 1
      if (x >= workSpaceWidth){
        y += 1
        x = 0
      }
    }
    charCode = null
  }
  for (let j = 0; j < 8; j++){
    if (endByte & bits[j]){
      context.fillRect(x, y, 1, 1)
    }
    x += 1
    if (x >= workSpaceWidth){
      y += 1
      x = 0
    }
  }

}

function renderBarcode(debugInfo, element) {
  let leftSideCanvas = document.createElement('canvas')
  let workSpaceCanvas = document.createElement('canvas')
  let rightSideCanvas = document.createElement('canvas')
  element.appendChild(leftSideCanvas)
  element.appendChild(workSpaceCanvas)
  element.appendChild(rightSideCanvas)

  let leftSideContext = leftSideCanvas.getContext("2d")
  let workSpaceContext = workSpaceCanvas.getContext("2d")
  let rightSideContext = rightSideCanvas.getContext("2d")
  leftSideContext.canvas.width = margLeft
  leftSideContext.canvas.height = height
  workSpaceContext.canvas.width = width - margLeft - margRight
  workSpaceContext.canvas.height = height
  rightSideContext.canvas.width = margRight
  rightSideContext.canvas.height = height
  const code = debugInfo.id + debugInfo.code.toString().padStart(3, '0') + debugInfo.message.padEnd(34, ' ')
  
  leftSideContext.scale(1, height)
  workSpaceContext.scale(scale, scale)
  rightSideContext.scale(1, height)

  drawSides(leftSideContext)
  drawSides(rightSideContext)
  drawCode(workSpaceContext, code)

}

export {renderBarcode}