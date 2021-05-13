type BoardAction = {
  type: string;
  boards: Board[];
  boardPrefs: Map<string, BoardPref>;
};

interface RouterParamTypes {
  id: string;
  name: string;
}
