import { IBand } from '../../interfaces/IBand'
import { TAction } from '../types'

const initialState: IBand = {};

export default (state = initialState, action: TAction) => {
  switch (action.type) {
    case "SET_BAND":
      return action.payload;
    default:
      return state;
  }
}