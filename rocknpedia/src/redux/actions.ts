import { TAction } from "./types";
import { IAccount } from "../interfaces/IAccount";
import { IBand, IBands } from "../interfaces/IBand";

export const SetAccountAction = (account: IAccount): TAction => ({
  type: "SET_ACCOUNT",
  payload: account
});

export const SetBandsAction = (bands: IBand[]): TAction => ({
  type: "SET_BANDS",
  payload: bands
})

export const LogoutAction = (): TAction => ({ type: "LOGOUT" });