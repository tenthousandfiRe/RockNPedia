import { produce } from "immer";
import { IAccount } from "../../interfaces/IAccount";
import { TAction } from "../types";
import { IStore } from "../../interfaces/IStore";



const initialState: IAccount = {
  token:"",
  user_id: null,
  username: "",
  is_admin: false,
  rol: "",
  user_image: ""
};

export default (state = initialState, action: TAction): IAccount =>
  produce(state, draftState => {
    switch (action.type) {
      case "SET_ACCOUNT":
        return action.payload;
      case "LOGOUT":
        return initialState;
      default:
        return state;
    }
  });
