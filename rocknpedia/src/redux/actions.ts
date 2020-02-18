import { TAction } from "./types";
import { IAccount } from "../interfaces/IAccount";
import { IBand, IBands } from "../interfaces/IBand";
import { IUser } from "../interfaces/IUsers";

export const SetAccountAction = (account: IAccount): TAction => ({
  type: "SET_ACCOUNT",
  payload: account
});

export const SetBandsAction = (bands: IBand[]): TAction => ({
  type: "SET_BANDS",
  payload: bands
})

export const SetBandAction = (band: IBand): TAction => ({
  type: "SET_BAND",
  payload: band
})
export const SetUsersAction = (users: IUser[]): TAction => ({
  type: "SET_USERS",
  payload: users
})

export const LogoutAction = (): TAction => ({ type: "LOGOUT" });