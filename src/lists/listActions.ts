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

export const addCardSucceeded = (card: Card, idList: string) =>
  ({
    type: "ADD_CARD_SUCCEEDED",
    card,
    idList,
  } as const);

export const archiveListSucceeded = (idList: string) =>
  ({
    type: "ARCHIVE_CARD_SUCCEEDED",
    idList,
  } as const);
