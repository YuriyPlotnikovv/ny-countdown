function toggleScrollButton() {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  scrollButton.style.display = windowHeight < bodyHeight ? "block" : "none";
}

const scrollButton = document.querySelector(".new-year-countdown__scroll-button");
if (scrollButton) {
  window.addEventListener("load", toggleScrollButton);
  window.addEventListener("resize", toggleScrollButton);
  scrollButton.addEventListener("click", function () {
    window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
  });
}
