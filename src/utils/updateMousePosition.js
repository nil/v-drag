export default function (e) {
  e.preventDefault();

  // Update value of the mouse position
  window.data.mouseX = e.pageX - window.data.initialX;
  window.data.mouseY = e.pageY - window.data.initialY;

  // Scroll page if dragging over the edges,
  // but only if mouse is static for some time
  // TODO: Improve this, make it more fluid and natural
  // window.setTimeout(() => {
  //   if ((e.clientY) > window.innerHeight * 0.8) {
  //     document.documentElement.scrollTop += 10;
  //   }

  //   if ((e.clientY) < window.innerHeight * 0.2) {
  //     document.documentElement.scrollTop -= 10;
  //   }

  //   if ((e.clientX) > window.innerWidth * 0.8) {
  //     document.documentElement.scrollLeft += 10;
  //   }

  //   if ((e.clientX) < window.innerWidth * 0.2) {
  //     document.documentElement.scrollLeft -= 10;
  //   }
  // }, 100);
}
