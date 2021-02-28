interface CardState {
  card: Card | null;
  updating: boolean;
}

const initialSate: CardState = {
  card: null,
  updating: false,
};

const cardReducer = (state = initialSate, action: ListAction) => {
  switch (action.type) {
    case "FETCH_CARD_BY_ID_SUCCEEDED":
      return {
        ...state,
        card: action.card,
      };
    case "RESET_CARD_STATE":
      return {
        ...state,
        card: null,
      };
    default:
      return state;
  }
};

export default cardReducer;
