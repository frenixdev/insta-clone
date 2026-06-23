import { api } from "@/shared/lib/axios";
import type { AxiosResponse } from "axios";
import type { PostPropsType } from "../types";

export const getFeed = async (): Promise<
  AxiosResponse<{ feed: PostPropsType[]; liked: string[] }>
> => {
  const res = await api.get("/feed");
  return res.data;
};
export const toggleLike = async (postId: string) => {
  const res = await api.post("/like/post/" + postId);
  return res.data;
};
