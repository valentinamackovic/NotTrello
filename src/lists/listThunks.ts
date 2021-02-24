import { fetchListsSucceeded } from "./listActions";

const testUrl =
  "https://api.trello.com/1/boards/5fe8b8b82e028f8bf92c61de/lists?cards=all&key=2b33a0b362affd1dc02a2f6ca2ffd923&token=6a244a046f4b46f7a82a89bb7b151a8497a8f7df8075be76db635e0d7ddc5145";

type DispatchType = (args: ListAction) => ListAction;

export const fetchLists = () => async (dispatch: DispatchType) => {
  fetch(testUrl)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data: List[]) => {
      dispatch(fetchListsSucceeded(data));
    });
};
