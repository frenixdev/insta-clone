import { useShallow } from "zustand/shallow";
import Post from "../post/Post";
import useFeedStore from "./store/feed.store";
import { useEffect } from "react";
import PostSkeleton from "../post/PostSkeleton";

const Feed = () => {
  const { getFeed, feed, toggleLike } = useFeedStore(
    useShallow((state) => ({
      getFeed: state.getFeed,
      feed: state.feed,
      toggleLike: state.handleToggleLike,
    })),
  );
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <section className="w-full flex items-center justify-center flex-col md:pt-5">
      {feed.length == 0
        ? new Array(10).fill(null).map((_) => <PostSkeleton />)
        : feed.map((post) => <Post {...post} toggleLike={toggleLike} />)}
    </section>
  );
};

export default Feed;
