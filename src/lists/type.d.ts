type ListAction = {
  type: string;
  lists: List[];
  list: List;
  idList: string;
  card: Card;
  comment: Action;
  idCard: string;
};

type ListEmptyAction = {
  type: string;
};
