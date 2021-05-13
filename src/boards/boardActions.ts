export const fetchBoardsSucceeded = (
  boards: Board[],
  boardPrefs: Map<string, BoardPref>
) =>
  ({
    type: "FETCH_BOARDS_SUCCEEDED",
    boards,
    boardPrefs,
  } as const);
