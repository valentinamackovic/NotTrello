interface ListState {
  lists: List[];
}

const initialSate: ListState = {
  lists: [],
};

const listReducer = (state = initialSate, action: ListAction) => {
  switch (action.type) {
    case "FETCH_LISTS_SUCCEEDED":
      return {
        ...state,
        lists: action.lists,
      };
    default:
      return state;
  }
};

export default listReducer;
