const audioElement = document.querySelector(".new-year-countdown__audio");
if (audioElement) {
  const audioButton = document.querySelector(".new-year-countdown__audio-button");
  audioElement.volume = 0.3;

  audioButton.addEventListener("click", function () {
    const icon = audioButton.querySelector(".new-year-countdown__scroll-icon");
    audioElement.muted = !audioElement.muted;

    if (icon.dataset.isPaused === "false") {
      audioElement.pause();
      icon.src = icon.dataset.originalSrc;
      icon.dataset.isPaused = "true";
    } else {
      audioElement.play();
      icon.dataset.originalSrc = icon.src;
      icon.src = "/public/assets/icons/audio-icon.gif";
      icon.dataset.isPaused = "false";
    }
  });
}
