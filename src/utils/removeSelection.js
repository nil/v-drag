export default function() {
	(window.getSelection ? window.getSelection() : document.selection).empty()
}