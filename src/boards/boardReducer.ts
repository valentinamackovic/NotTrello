interface BoardState {
  boards: Board[];
  boardPreferences: Map<string, BoardPref>;
}

const initialSate: BoardState = {
  boards: [],
  boardPreferences: new Map(),
};

const listReducer = (state = initialSate, action: BoardAction): BoardState => {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCEEDED":
      return {
        ...state,
        boards: action.boards,
        boardPreferences: action.boardPrefs,
      };
    default:
      return state;
  }
};

export default listReducer;
