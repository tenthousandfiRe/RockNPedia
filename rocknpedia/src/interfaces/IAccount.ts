import { ITokenPayload } from "./ITokenPayload";

export interface IAccount  {
  token: string | any;
  user_id: number;
  username?: string;
  is_admin?: boolean;
  rol?: string;
  user_image?: string;
}
