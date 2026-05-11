import {  AxiosError } from "axios";

export function getErrMsg(err: Error | AxiosError): string {
  if (err instanceof AxiosError)
    return err.response.data.message || err.message;
  return "something went wrong";
}
