type ListAction = {
  type: string;
  lists: List[];
  list: List;
  idList: string;
  card: Card;
  comment: Action;
  idCard: string;
  movedFromList: List;
  movedToList: List;
};

type ListEmptyAction = {
  type: string;
};
