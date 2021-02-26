import { addListSucceeded, fetchListsSucceeded } from "./listActions";

const testUrl =
  "https://api.trello.com/1/boards/5fe8b8b82e028f8bf92c61de/lists?cards=all&key=2b33a0b362affd1dc02a2f6ca2ffd923&token=6a244a046f4b46f7a82a89bb7b151a8497a8f7df8075be76db635e0d7ddc5145";
const anotherTestUrl = "https://api.trello.com/1/lists";
const keyAndToken =
  "key=2b33a0b362affd1dc02a2f6ca2ffd923&token=6a244a046f4b46f7a82a89bb7b151a8497a8f7df8075be76db635e0d7ddc5145";
type DispatchType = (args: ListAction | ListEmptyAction) => ListAction;

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

export const addList = (name: string) => async (dispatch: DispatchType) => {
  fetch(
    anotherTestUrl +
      "?pos=bottom&name=" +
      name +
      "&idBoard=5fe8b8b82e028f8bf92c61de&" +
      keyAndToken,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((list) => dispatch(addListSucceeded(list)));
};
