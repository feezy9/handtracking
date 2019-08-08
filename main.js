const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
trackButton.addEventListener("click", toggleVideo);

let imgindex = 1
let isVideo = false;
let model = null;

const modelParams = {
    flipHorizontal: true, // flip e.g for video  
    maxNumBoxes: 1, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
}
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel

});



function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true
            video.style.display = "none";
            runDetection()
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        startVideo();
    } else {
        handTrack.stopVideo(video)
        isVideo = false;
    }
}

function runDetection() {
    model.detect(video).then(predictions => {
        if (predictions.length > 0) console.log("Predictions: ", predictions);
        
        model.renderPredictions(predictions, canvas, context, video);
        doSomethingCool(predictions, context);
        if (isVideo) {
            requestAnimationFrame(runDetection);


        }
    });
}

function doSomethingCool(predictions, context) {
    if (predictions.length > 0 && predictions[0].bbox[0] >= 320 && predictions[0].bbox[1] <= 240) {
        context.fillStyle = "green";
        context.fillRect(320, 0, 320, 240);

    }

}