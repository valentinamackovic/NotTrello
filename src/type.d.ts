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
  desc: string;
  actions: Action[];
};

type Action = {
  id: string;
  type: string;
  data: {
    text: string;
  };
  memberCreator: Member;
  date: Date
};

type Member = {
  id: string;
  fullName: string;
};
