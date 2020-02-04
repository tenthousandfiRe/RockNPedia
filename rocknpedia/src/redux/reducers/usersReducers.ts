import { IUser } from './../../interfaces/IUsers';
import { TAction } from "../types";
import produce from 'immer'


const initialState: IUser[] = [];

export default (state = initialState, action: TAction) =>
  produce(state, draftState => {
    switch (action.type) {
      case "SET_USERS":
        return action.payload;
      default:
        return state;
    }
  });