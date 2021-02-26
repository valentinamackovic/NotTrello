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
    case "ADD_LIST_SUCCEEDED":
      return {
        ...state,
        lists: [...state.lists, action.list],
      };
    default:
      return state;
  }
};

export default listReducer;
