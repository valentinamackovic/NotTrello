export const fetchBoardsSucceeded = (boards: Board[]) =>
  ({
    type: "FETCH_BOARDS_SUCCEEDED",
    boards,
  } as const);
