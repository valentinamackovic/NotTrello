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
