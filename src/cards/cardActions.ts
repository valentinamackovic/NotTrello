export const fetchCardByIdSucceeded = (card: Card) =>
  ({
    type: "FETCH_CARD_BY_ID_SUCCEEDED",
    card,
  } as const);

export const resetCardState = () =>
  ({
    type: "RESET_CARD_STATE",
  } as const);
