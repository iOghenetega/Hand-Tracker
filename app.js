const modelParams = {
  flipHorizontal: true,
  imageScaleFactor: 0.7,
  maxNumBoxes: 20,
  iouThreshold: 0.5,
  scoreThreshold: 0.79,
}

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUsermedia

const video = document.querySelector('#video')
const audio = document.querySelector('#audio')
const span = document.querySelector('#span')
const context = canvas.getContext('2d')
let model

handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObj = stream
        runDetection()
      },
      (err) => console.log(err)
    )
  }
})

function runDetection() {
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, canvas, context, video)
    if (predictions.length > 0) {
      audio.play()
    }
    requestAnimationFrame(runDetection)
  })
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel
})
