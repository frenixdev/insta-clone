import { api } from "@/shared";
import type { AxiosResponse } from "axios";
import type { PostPropsType } from "../types";

//* Post
export const uploadPostService = async (formData: FormData) => {
  const res = await api.post("/post", formData);
  return res.data;
};
export const deletePostService = async(postId: string) =>{
  const res = await api.delete("/post/"+postId)
  return res.data
}

//* Feed
export const getFeedService = async (): Promise<
  AxiosResponse<{ feed: PostPropsType[]; liked: string[] }>
> => {
  const res = await api.get("/feed");
  return res.data;
};
//* Like
export const toggleLikeService = async (postId: string) => {
  const res = await api.post("/like/post/" + postId);
  return res.data;
};
