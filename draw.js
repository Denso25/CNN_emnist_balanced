/**
 * 
 * @param {*} ctx canvas.getContext('2d')
 * @param {*} start [x,y]
 * @param {*} end [x,y]
 * @param {*} color "rgb(255,255,255)"||"#000000"
 * @param {*} lineWidth (int||float)>0 default=5
 */
function draw(ctx, start = [0, 0], end = [0, 0], color = "#000000", lineWidth = 5) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke()
}
/**
 * 
 * @param {HTMLElement} canvasDom HTMLElement Canvas
 * @param {*} event  MouseEvent|| TouchEvent
 * @param {int} lineWidth number
 * @returns  '{x: float||int, y: float||int}'
 */
function getPosXY(canvasDom, event, lineWidth = 10) {
    const touchEvent = ['touchstart', 'touchend', 'touchmove']
    const mouseEvent = ['mousedown', 'mouseup', 'mousemove', 'mouseout']
    const rectLeft = canvasDom.getBoundingClientRect().left + (lineWidth / 2)
    const rectTop = canvasDom.getBoundingClientRect().top + (lineWidth / 2)
    if (touchEvent.includes(event.type)) {
        return {
            x: event.changedTouches[0].clientX - rectLeft,
            y: event.changedTouches[0].clientY - rectTop
        }
    } else if (mouseEvent.includes(event.type)) {
        return {
            x: event.clientX - rectLeft,
            y: event.clientY - rectTop
        }
    }
}

const canvas = document.getElementById('mainCanvas')
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnable = true
console.log(ctx);
let startX = 0, startY = 0;
let endX = 0, endY = 0;
let drawing = false
let colorLine = 'rgb(200,200,200,0.3)'
let lineWidth = 10



canvas.addEventListener('mousedown', (event) => {
    const { x, y } = getPosXY(canvas, event, lineWidth)
    //Point as coordinate
    startX = x
    startY = y
    endX = x + 0.1
    endY = y + 0.1
    //Start
    draw(ctx, [startX, startY], [endX, endY], colorLine, lineWidth)
    drawing = true
})

canvas.addEventListener('touchstart', (event) => {
    const { x, y } = getPosXY(canvas, event, lineWidth)
    //Point as coordinate
    startX = x
    startY = y
    endX = x + 0.1
    endY = y + 0.1
    //Start
    draw(ctx, [startX, startY], [endX, endY], colorLine, lineWidth)
    drawing = true
})

canvas.addEventListener('mousemove', (event) => {
    if (drawing) {
        const { x, y } = getPosXY(canvas, event, lineWidth)
        startX = endX
        startY = endY
        endX = x
        endY = y
        draw(ctx, [startX, startY], [endX, endY], colorLine, lineWidth)
    }
})
canvas.addEventListener('touchmove', (event) => {
    if (drawing) {
        const { x, y } = getPosXY(canvas, event, lineWidth)
        startX = endX
        startY = endY
        endX = x
        endY = y
        draw(ctx, [startX, startY], [endX, endY], colorLine, lineWidth)
    }
})

canvas.addEventListener('mouseup', (e) => {
    if (drawing) {
        const { x, y } = getPosXY(canvas, event, lineWidth)
        startX = endX
        startY = endY
        endX = x
        endY = y
        draw(ctx, [startX, startY], [endX, endY], colorLine, lineWidth)
    }
    drawing = false
})

canvas.addEventListener('touchend', (event) => {
    if (drawing) {
        const { x, y } = getPosXY(canvas, event, lineWidth)
        startX = endX
        startY = endY
        endX = x
        endY = y
        draw(ctx, [startX, startY], [endX, endY], colorLine, lineWidth)
    }
    drawing = false
})

canvas.addEventListener('mouseout', (event) => {
    if (drawing) {
        const { x, y } = getPosXY(canvas, event, lineWidth)
        startX = endX
        startY = endY
        endX = x
        endY = y
        draw(ctx, [startX, startY], [endX, endY], colorLine, lineWidth)
    }
    drawing = false
})
