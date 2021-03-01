interface CardState {
  card: Card | null;
  updating: boolean;
}

const initialSate: CardState = {
  card: null,
  updating: false,
};

const cardReducer = (state = initialSate, action: ListAction): CardState => {
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
    case "ADD_COMMENT_SUCCEEDED":
      let updatedCard;
      if (state.card !== null) {
        const newActionsList = [action.comment].concat(state.card?.actions);
        updatedCard = { ...state.card, actions: newActionsList };
      }
      return {
        ...state,
        card: updatedCard || null,
      };
    case "UPDATE_COMMENT_SUCCEEDED":
      let updatedComment;
      if (state.card !== null) {
        updatedComment = {
          ...state.card,
          actions: [...(state.card?.actions || []), action.comment],
        };
      }
      return {
        ...state,
        card: updatedComment || null,
      };
    default:
      return state;
  }
};

export default cardReducer;
