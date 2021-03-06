export const fetchListsSucceeded = (lists: List[]) =>
  ({
    type: "FETCH_LISTS_SUCCEEDED",
    lists,
  } as const);

export const addListSucceeded = (list: List) =>
  ({
    type: "ADD_LIST_SUCCEEDED",
    list,
  } as const);

export const updateListSucceeded = (list: List) =>
  ({
    type: "UPDATE_LIST_SUCCEEDED",
    list,
  } as const);

export const addCardSucceeded = (card: Card, idList: string) =>
  ({
    type: "ADD_CARD_SUCCEEDED",
    card,
    idList,
  } as const);

export const archiveListSucceeded = (idList: string) =>
  ({
    type: "ARCHIVE_LIST_SUCCEEDED",
    idList,
  } as const);

export const updateCardSucceeded = (card: Card) =>
  ({
    type: "UPDATE_CARD_SUCCEEDED",
    card,
  } as const);

export const archiveCardSucceeded = (idCard: string) =>
  ({
    type: "ARCHIVE_CARD_SUCCEEDED",
    idCard,
  } as const);

export const reorderListsSucceeded = (lists: List[]) =>
  ({
    type: "REORDER_LISTS_SUCCEEDED",
    lists,
  } as const);

export const reorderCardsSucceeded = (lists: List[]) =>
  ({
    type: "REORDER_CARDS_SUCCEEDED",
    lists,
  } as const);
