export const fetchCardByIdSucceeded = (card: Card) =>
  ({
    type: "FETCH_CARD_BY_ID_SUCCEEDED",
    card,
  } as const);
