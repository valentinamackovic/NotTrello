type Board = {
  id: string;
  name: string;
  prefs: BoardPref;
};

type BoardPref = {
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundBrightness: BackgroundBrigthness;
};

type BackgroundBrigthness = "light" | "dark";

type List = {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  cards: Card[];
  pos: number;
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
    card: Card;
  };
  memberCreator: Member;
  date: Date;
};

type Member = {
  id: string;
  fullName: string;
};
