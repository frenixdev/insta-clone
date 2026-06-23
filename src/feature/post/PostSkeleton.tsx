import Skeleton from "react-loading-skeleton";

const PostSkeleton = () => {
  return (
    <article className="w-120 p-2 mx-auto ">
      <div className="top flex items-center justify-between p-3">
        <div className="left flex items-center justify-center gap-3 ">
          <div className="w-9 aspect-square  rounded-full overflow-hidden">
            <Skeleton circle={true} className="h-9 w-9" />
          </div>
          <Skeleton height="10px" width="6rem" />
        </div>
        <Skeleton height="2.5rem" width="5rem" />
      </div>
      <Skeleton className="w-full h-140" />
    </article>
  );
};

export default PostSkeleton;
