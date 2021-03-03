import API from "../api";
import { fetchBoardsSucceeded } from "./boardActions";

type DispatchType = (args: ListAction | ListEmptyAction) => ListAction;

export const fetchBoards = () => async (dispatch: DispatchType) => {
  API.get<Board[]>("members/me/boards").then((response) => {
    if (response.status === 200) {
      dispatch(fetchBoardsSucceeded(response.data));
    }
  });
};

export const createBoard = (name: string) => async (
  dispatch: DispatchType | any
) => {
  API.post<Board>("boards", null, { params: { name } }).then((response) => {
    if (response.status === 200) {
      dispatch(fetchBoards());
    }
  });
};
