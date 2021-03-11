export function onEscapeOrEnter(
  event: KeyboardEvent,
  onEscape: () => void,
  onEnter: () => void
) {
  event.stopPropagation();
  if (event.key === "Escape") {
    onEscape();
  } else if (event.key === "Enter") {
    onEnter();
  }
}
