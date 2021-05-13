import { useEffect } from "react";

export function useEscapeClick(onEscape: () => void) {
  useEffect(() => {
    function handleClickOutside(event: KeyboardEvent) {
      //@ts-ignore
      if (event.target?.id === "comment") {
        return;
      }
      if (event.key === "Escape") {
        onEscape();
      }
    }

    document.addEventListener("keydown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [onEscape]);
}
