export const fetchListsSucceeded = (lists: List[]) =>
  ({
    type: "FETCH_LISTS_SUCCEEDED",
    lists,
  } as const);
