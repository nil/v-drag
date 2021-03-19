export function vueDragEnd (e, moveTarget) {
	moveTarget.dispatchEvent(new Event('v-drag-end'))
}
