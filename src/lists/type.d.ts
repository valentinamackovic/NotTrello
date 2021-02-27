type ListAction = {
  type: string;
  lists: List[];
  list: List;
  idList: string;
  card: Card;
};

type ListEmptyAction = {
  type: string;
};
