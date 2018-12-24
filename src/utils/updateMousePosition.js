export default function (e) {
  window.data.mouseX = (e.pageX || e.touches[0].pageX) - window.data.initialX;
  window.data.mouseY = (e.pageY || e.touches[0].pageY) - window.data.initialY;
}
