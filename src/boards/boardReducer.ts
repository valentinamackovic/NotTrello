interface BoardState {
  boards: Board[];
}

const initialSate: BoardState = {
  boards: [],
};

const listReducer = (state = initialSate, action: BoardAction): BoardState => {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCEEDED":
      return {
        ...state,
        boards: action.boards,
      };
    default:
      return state;
  }
};

export default listReducer;
