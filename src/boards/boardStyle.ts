export const resetColors = () => {
  setBackgroundColor("white");
  setTextColor("light");
  setBackgroundImage("");
};

export const setBackgroundColorFromPreferences = (
  boardPreferences: BoardPref | undefined
) => {
  if (boardPreferences === undefined) return;

  if (boardPreferences.backgroundImage) {
    setBackgroundImage(boardPreferences.backgroundImage);
    return;
  }

  const color = boardPreferences.backgroundColor;
  if (color) {
    setBackgroundColor(color);
    setTextColor(boardPreferences.backgroundBrightness);
  }
};

const setBackgroundColor = (color: string) => {
  document.documentElement.style.setProperty("--root-color", color);
};

const setTextColor = (background: BackgroundBrigthness) => {
  if (background === "light") {
    document.documentElement.style.setProperty("--text-color", "#172b4d");
  } else if (background === "dark") {
    document.documentElement.style.setProperty("--text-color", "#ebecf0");
  }
};

const setBackgroundImage = (image: string) => {
  document.documentElement.style.setProperty(
    "--root-image",
    "url(" + image + ")"
  );
};

export const getMapOfBoardPref = (boards: Board[]) => {
  const mapOfBoardPref: Map<string, BoardPref> = new Map();

  boards.forEach((board) => {
    mapOfBoardPref.set(board.id, board.prefs);
  });

  return mapOfBoardPref;
};
