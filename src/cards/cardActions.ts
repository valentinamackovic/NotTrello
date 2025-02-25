export const fetchCardByIdSucceeded = (card: Card) =>
  ({
    type: "FETCH_CARD_BY_ID_SUCCEEDED",
    card,
  } as const);

export const resetCardState = () =>
  ({
    type: "RESET_CARD_STATE",
  } as const);

export const addCommentSucceeded = (comment: Action) =>
  ({
    type: "ADD_COMMENT_SUCCEEDED",
    comment,
  } as const);

export const updateCommentSucceeded = (comment: Action) =>
  ({
    type: "UPDATE_COMMENT_SUCCEEDED",
    comment,
  } as const);
