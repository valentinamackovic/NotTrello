type List = {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
};

type ListAction = {
  type: string;
  lists: List[];
};
