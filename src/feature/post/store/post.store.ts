import { create } from "zustand";
import { getErrMsg } from "@/shared";
import{ AxiosError } from "axios";
import {
  deletePostService,
  getFeedService,
  toggleLikeService,
  uploadPostService,
} from "../services/post.services";
import type { PostType, TempPostPropsType } from "../types";

type uploadPostParams = {
  caption: string;
  file: File;
  username: string;
  profileImg: string;
};
interface PostStoreType {
  feed: PostType[];
  error: string;
  tempPost: TempPostPropsType | null;
  isLoading: boolean;
  errorLoading: boolean;
  getFeed: () => Promise<void>;
  handleToggleLike: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  uploadPost: (params: uploadPostParams) => Promise<void>;
}

const usePostStore = create<PostStoreType>((set, get) => ({
  feed: [],
  error: null,
  tempPost: null,
  isLoading: false,
  errorLoading: false,
  getFeed: async () => {
    try {
      const { data } = await getFeedService();

      const { feed, liked } = data;
      const likedPostIds = new Set(liked);
      const newFeed = feed.map((post) => ({
        ...post,
        isLiked: likedPostIds.has(post._id),
      }));
      set({ feed: newFeed });
    } catch (err) {
      console.log(err);
      if (err instanceof Error || err instanceof AxiosError)
        set({ error: getErrMsg(err) });
    }
  },
  handleToggleLike: async (postId) => {
    const prevState = get().feed;
    try {
      set((state) => ({
        feed: state.feed.map((post) => {
          if (post._id !== postId) return post;
          return {
            ...post,
            likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
            isLiked: !post.isLiked,
          };
        }),
      }));
      await toggleLikeService(postId);
    } catch (error) {
      console.log("error liking post: ", error);
      set({ feed: prevState });
    }
  },
  uploadPost: async ({ caption, file, username, profileImg }) => {
    try {
      set({
        tempPost: {
          caption,
          imageUrl: URL.createObjectURL(file),
          author: {
            username,
            profileImg,
          },
        },
        isLoading: true,
        errorLoading: false,
      });
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image-file", file);
      const res = await uploadPostService(formData);
      console.log(res.data)
      set((state) => ({
        tempPost: null,
        feed: [res.data, ...state.feed],
      }));
      set({ tempPost: null });
    } catch (err) {
      console.log(err)
      set({ errorLoading: true });
    } finally {
      set({ isLoading: false });
    }
  },
  deletePost: async (postId) => {
    set({ isLoading: true, errorLoading: false });
    try {
      await deletePostService(postId);
      set((state) => ({
        feed: state.feed.filter((post) => post._id !== postId),
      }));
    } catch (error) {
      console.log("Error deleting post: ", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePostStore;
