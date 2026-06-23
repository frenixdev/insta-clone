import { create } from "zustand";
import { getErrMsg } from "@/shared/utils";
import type { PostPropsType } from "../types";
import { getFeed, toggleLike } from "../services/feed.services";

interface FeedStoreType {
  feed: PostPropsType[];
  error: string | null;
  getFeed: () => Promise<void>;
  handleToggleLike: (postId: string) => Promise<void>;
}

const useFeedStore = create<FeedStoreType>((set, get) => ({
  feed: [],
  error: null,
  getFeed: async () => {
    try {
      const { data } = await getFeed();
      const { feed, liked } = data;
      const likedPostIds = new Set(liked);
      const newFeed = feed.map((post) => ({
        ...post,
        isLiked: likedPostIds.has(post._id),
      }));
      set({ feed: newFeed });
    } catch (err) {
      console.log(err);
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
      await toggleLike(postId);
    } catch (error) {
      console.log("error liking post: ", error);
      set({ feed: prevState });
    }
  },
}));

export default useFeedStore;
