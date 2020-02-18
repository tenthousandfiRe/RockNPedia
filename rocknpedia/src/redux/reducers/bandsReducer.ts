import { IBand } from '../../interfaces/IBand'
import { TAction } from "../types";
import produce from 'immer'

const initialState: IBand[] = [];

export default (state = initialState, action: TAction) =>
  produce(state, draftState => {
    switch (action.type) {
      case "SET_BANDS":
        return action.payload;
      default:
        return state;
    }
  });