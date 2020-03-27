"use strict";

const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', ev => {
    document.querySelectorAll('section.current').forEach(s => s.classList.remove('modal'));
    const section = document.querySelector(ev.target.hash);
    section.classList.add('modal');
    section.addEventListener('click', ev => section.classList.remove('modal'));
    if(ev.target.hash === "#fromCamera") {
      navigator.mediaDevices.getUserMedia({video: true}).then((stream) => { player.srcObject = stream; });
    } else {
      player.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  })
})

const context = canvas.getContext('2d');

fileInput.addEventListener('change', (e) => doSomethingWithFiles(e.target.files));

function doSomethingWithFiles(fileList) {
  let file = null;
  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i].type.match(/^image\//)) {
      file = fileList[i];
      break;
    }
  }
  if (file !== null) {
    const output = document.createElement('img');
    output.src = URL.createObjectURL(file);
    output.addEventListener('load', ev => {
      context.drawImage(output, 0, 0, canvas.width, canvas.height);
      output.remove();
    })
  }
  fileInput.value = null;
}

capture.addEventListener('click', () => {
  // Draw the video frame to the canvas.
  context.drawImage(player, 0, 0, canvas.width, canvas.height);

  // Stop all video streams.
  player.srcObject.getVideoTracks().forEach(track => track.stop());
});
