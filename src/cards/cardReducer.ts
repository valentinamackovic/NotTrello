interface CardState {
  card: Card | undefined;
}

const initialSate: CardState = {
  card: undefined,
};

const cardReducer = (state = initialSate, action: ListAction) => {
  switch (action.type) {
    case "FETCH_CARD_BY_ID_SUCCEEDED":
      return {
        ...state,
        card: action.card,
      };
    default:
      return state;
  }
};

export default cardReducer;
