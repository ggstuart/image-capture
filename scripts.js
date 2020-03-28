"use strict";

const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', ev => {
    document.querySelectorAll('section.current').forEach(s => s.classList.remove('modal'));
    const section = document.querySelector(ev.target.hash);
    section.classList.add('modal');
    if(ev.target.hash === "#fromCamera") {
      navigator.mediaDevices.getUserMedia({video: true}).then((stream) => { player.srcObject = stream; });
      section.addEventListener('click', evClick => {
        player.srcObject.getVideoTracks().forEach(track => track.stop());
        section.classList.remove('modal')
      });
    } else {
      section.addEventListener('click', evClick => {
        section.classList.remove('modal')
      });
    }
  })
})

const context = canvas.getContext('2d');

fileInput.addEventListener('change', (e) => doSomethingWithFiles(e.target.files));

function extractFirstValidFile(fileList) {
  for(const file of fileList) {
    if (file.type.match(/^image\//)) {
      return file;
    }
  }
}

function doSomethingWithFiles(fileList) {
  const file = extractFirstValidFile(fileList);
  if (file !== null) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.addEventListener('load', ev => {
      canvas.width = ev.path[0].width;
      canvas.height = ev.path[0].height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      image.remove();
    })
  }
  fileInput.value = null;
}

capture.addEventListener('click', () => {
  // Draw the video frame to the canvas.
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;
  context.drawImage(player, 0, 0, canvas.width, canvas.height);

  // Stop all video streams.
  player.srcObject.getVideoTracks().forEach(track => track.stop());
});
