let model = null
const class_names = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'd', 'e', 'f', 'g', 'h', 'n', 'q', 'r', 't'
]


const smallCtx = document.getElementById('smallCanvas').getContext('2d')
const btnClear = document.getElementById('btnClear')

btnClear.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    smallCtx.clearRect(0, 0, 28, 28)
})

const btnPrediction = document.getElementById('btnPrediction')
btnPrediction.addEventListener('click', () => {
    smallCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 28, 28)
 
    let imgPixels = smallCtx.getImageData(0, 0, 28, 28)
    for (let i = 0; i < imgPixels.data.length; i += 4) {
        let avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]+ imgPixels.data[i+3]) / 4;
        imgPixels.data[i] = 0
        imgPixels.data[i + 1] = 0
        imgPixels.data[i + 2] = 0
        imgPixels.data[i + 3] = avg

    }
    smallCtx.putImageData(imgPixels, 0, 0, 0, 0, 28, 28)
    const imageData = normalize28x28(smallCtx.getImageData(0, 0, 28, 28).data)
    const tensor4 = tf.tensor4d(imageData)
    const results = model.predict(tensor4).dataSync()
    const higherIndex = results.indexOf(Math.max.apply(null, results))

    document.getElementById('txtPrediction').innerHTML = class_names[higherIndex]

})

function normalize28x28(matrix = []) {
    let newMatrix = []
    let width = []

    for (let i = 0; i < matrix.length; i += 4) {
        width.push([matrix[i + 3] / 255])
        if (width.length == 28) {
            newMatrix.push(width)
            width = []
        }
    }
    return [newMatrix]
}

(async () => {
    console.log('Cargando modelo...')
    model = await tf.loadLayersModel("./model_CNN/model.json")
    console.log('Modelo cargado');
})()

