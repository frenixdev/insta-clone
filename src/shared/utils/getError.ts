import { AxiosError } from "axios";

export function getErrMsg(err: AxiosError | Error): string {
  let msg: string = ""
  if (err instanceof Error) msg = err?.message;
  if (err instanceof AxiosError) msg = err?.message;

  return msg || "something went wrong";
}
