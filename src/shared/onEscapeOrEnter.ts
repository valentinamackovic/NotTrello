export function onEscapeOrEnter(
  key: string,
  onEscape: () => void,
  onEnter: () => void
) {
  if (key === "Escape") {
    onEscape();
  } else if (key === "Enter") {
    onEnter();
  }
}
