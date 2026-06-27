import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import usePostStore from "../store/post.store";
import useAuthStore from "@/feature/auth/store/auth.store";

import PostCard from "../components/PostCard";
import PostSkeleton from "../components/PostSkeleton";
import TempPost from "../components/TempPost";

const Feed = () => {
  const user = useAuthStore((s) => s.user);
  const Post = usePostStore(
    useShallow((state) => ({
      tempPost: state.tempPost,
      feed: state.feed,
      getFeed: state.getFeed,
      toggleLike: state.handleToggleLike,
      deletePost: state.deletePost,
      errorLoading: state.errorLoading,
      isLoading: state.isLoading,
    })),
  );
  useEffect(() => {
    Post.getFeed();
  }, []);
  return (
    <section className="w-full flex items-center justify-center flex-col md:pt-5">
      {Post.tempPost && (
        <TempPost
          {...Post.tempPost}
          isLoading={Post.isLoading}
          isError={Post.errorLoading}
        />
      )}
      {Post.feed.length == 0
        ? new Array(10)
            .fill(null)
            .map((_, index) => <PostSkeleton key={index} />)
        : Post.feed.map((post) => (
            <PostCard
              key={post._id}
              {...post}
              toggleLike={Post.toggleLike}
              deletePost={Post.deletePost}
              isAuthor={user?.username === post.author.username}
            />
          ))}
    </section>
  );
};

export default Feed;
