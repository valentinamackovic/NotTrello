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
    case "REORDER_LISTS_SUCCEEDED":
      return {
        ...state,
        lists: action.lists,
      };
    case "ADD_LIST_SUCCEEDED":
      return {
        ...state,
        lists: [...state.lists, action.list],
      };
    case "UPDATE_LIST_SUCCEEDED":
      const updatedListName = state.lists.map((list) =>
        list.id === action.list.id ? { ...list, name: action.list.name } : list
      );
      return {
        ...state,
        lists: updatedListName,
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
    case "ARCHIVE_LIST_SUCCEEDED":
      const list: List[] = state.lists.filter(
        (list) => list.id !== action.idList
      );
      return {
        ...state,
        lists: [...list],
      };
    case "ARCHIVE_CARD_SUCCEEDED":
      const listWithoutCard: List[] = state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards.filter((card) => card.id !== action.idCard),
        };
      });
      return {
        ...state,
        lists: listWithoutCard,
      };
    case "UPDATE_CARD_SUCCEEDED":
      const updatedCardList = state.lists.map((list) => {
        if (list.id === action.card.idList) {
          const cardsWithoutUpdatedOne = list.cards.filter(
            (card) => card.id !== action.card.id
          );
          return { ...list, cards: [...cardsWithoutUpdatedOne, action.card] };
        }
        return list;
      });
      return {
        ...state,
        lists: updatedCardList,
      };
    default:
      return state;
  }
};

export default listReducer;
