export default function (e) {
  window.vnode.mouseX = (e.pageX || e.touches[0].pageX) - window.vnode.initialX;
  window.vnode.mouseY = (e.pageY || e.touches[0].pageY) - window.vnode.initialY;
}
