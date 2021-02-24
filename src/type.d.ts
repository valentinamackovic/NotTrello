type List = {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  cards: Card[];
};

type Card = {
  id: string;
  idList: string;
  name: string;
  description: string;
};
