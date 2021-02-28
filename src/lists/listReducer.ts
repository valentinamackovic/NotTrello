interface ListState {
  lists: List[];
}

const initialSate: ListState = {
  lists: [],
};

const listReducer = (state = initialSate, action: ListAction): ListState => {
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
    case "ADD_CARD_SUCCEEDED":
      const updatedList: List[] = state.lists.map((list) =>
        list.id === action.idList
          ? { ...list, cards: [...list.cards, action.card] }
          : list
      );
      return {
        ...state,
        lists: updatedList,
      };
    default:
      return state;
  }
};

export default listReducer;
