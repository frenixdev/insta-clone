import { ErrorText, Img, Loader } from "@/shared";
import type { TempPostPropsType } from "../types";

const TempPost = (props: TempPostPropsType) => {
  return (
    <article className="md:w-120 p-2 mx-auto font-bold tracking-wide">
      <div className="top flex items-center justify-between p-3 ">
        <div className="left flex items-center justify-center gap-3 ">
          <div className="w-9 aspect-square  rounded-full overflow-hidden">
            <Img
              src={props.author.profileImg}
              alt="author-image"
              className="object-cover object-center"
            />
          </div>
          <span>{props.author.username}</span>
        </div>
        <div className="flex gap-2 items-center justify-center h-8">
          {props.isLoading && !props.isError && (
            <Loader height="2rem" width="2rem" />
          )}
          {props.isError && <ErrorText text="failed" />}
        </div>
      </div>
      <div className="w-full relative">
        <Img src={props?.imageUrl} alt="user-post" height="80dvh" />
      </div>
      {props.caption && (
        <p className="m-2 p-.5">
          <span className="font-semibold text-zinc-300 mr-2">
            {props.author.username}
          </span>
          <span className="font-normal text-zinc-400 text-md">
            {props.caption}
          </span>
        </p>
      )}
    </article>
  );
};

export default TempPost;
