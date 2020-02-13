import { API_URL } from "./constants";
import { IAccount } from "./interfaces/IAccount";
import { decode } from "jsonwebtoken";
import { ITokenPayload } from "./interfaces/ITokenPayload";



export const myFetch = async ({
    method = "GET",
    path,
    json,
    formData,
    token
  }: {
    path: string;
    method?: "GET" | "POST" | "DELETE" | "PUT";
    json?: Object;
    formData?: FormData;
    token?: string | any;
  }) => {
     
    let headers = new Headers();
    let body = undefined;
    if (json) {
      headers.set("Content-Type", "application/json");
      body = JSON.stringify(json);
    } else if (formData) {
      body = formData;
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(API_URL + path, {
      method,
      headers,
      body
    });
    try {
      const json =  await response.json();
      return json;
    } catch {
      return null;
    }
  };
  
  export const generateAccountFromToken = (token: string): IAccount => {
    const { user_id, username, is_admin, user_image, rol } = decode(token) as IAccount;
    return { token, user_id, username, is_admin, user_image, rol };
  };
  