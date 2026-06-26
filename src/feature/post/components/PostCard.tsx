import { memo, useRef, useState } from "react";
import { motion } from "motion/react";
import { FiHeart } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import { PiShareFatLight } from "react-icons/pi";
import { FaHeart, FaRegComment } from "react-icons/fa";

import { getTimeAgo } from "@/shared";
import { Img, Button, DownloadFile } from "@/shared";

import type { PostPropsType } from "../types";
import { IoTrashBinOutline } from "react-icons/io5";

const PostCard = memo((props: PostPropsType) => {
  const [showHeart, setShowHeart] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { isLiked, toggleLike } = props;

  const showLikeAnimation = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHeart(true);
    timerRef.current = window.setTimeout(() => setShowHeart(false), 700);
  };

  const handleLikeClick = async () => {
    if (!isLiked) showLikeAnimation();
    await toggleLike(props._id);
  };

  const handleImageLike = async () => {
    showLikeAnimation();
    if (!isLiked) await toggleLike(props._id);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="md:w-120 p-2 mx-auto font-bold tracking-wide"
    >
      <div className="top flex items-center justify-between p-3">
        <div className="left flex items-center justify-center gap-3 ">
          <div className="w-9 aspect-square  rounded-full overflow-hidden">
            <Img
              src={props.author.profileImg}
              alt="author-image"
              className="object-cover object-center"
            />
          </div>
          <span>{props.author.username}</span>
          <span className="text-zinc-400 text-sm tracking-tight relative before:absolute before:w-1 before:aspect-square before:rounded-full before:bg-zinc-400 before:top-1/2 before:-left-3 ml-3 font-normal">
            {getTimeAgo(props.createdAt)}
          </span>
        </div>
        {props.isAuthor && (
          <Button
            className=" text-red-500 hover:text-red-600 text-2xl "
            onClick={() => props.deletePost(props._id)}
          >
            <IoTrashBinOutline />
          </Button>
        )}
      </div>
      <div className="w-full relative" onDoubleClick={handleImageLike}>
        {showHeart && (
          <FaHeart
            className={`text-red-500 w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-heart-pop pointer-events-none`}
          />
        )}
        <Img src={props?.imageUrl} alt="user-post" height="80dvh" />
      </div>
      <div className="px-3 flex items-center justify-between">
        <div className="left flex gap-5 items-center justify-center">
          <div className="flex items-center justify-center gap-1 text-xl">
            <Button onClick={handleLikeClick}>
              {isLiked ? (
                <FaHeart className="text-red-500 w-7 h-7" />
              ) : (
                <FiHeart className="w-7 h-7" />
              )}
            </Button>
            {props.likeCount ? <span>{props.likeCount}</span> : null}
          </div>
          <div>
            <Button>
              <FaRegComment className="w-7 h-7" />
            </Button>
          </div>
          <div>
            <Button>
              <PiShareFatLight className="w-7 h-7" />
            </Button>
          </div>
        </div>
        <div className="flex gap-5">
          <DownloadFile
            imgUrl={props.imageUrl}
            title={`${props.author.username}-post.jpg`}
          />
          <Button>
            <CiBookmark className="w-7 h-7" />
          </Button>
        </div>
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
    </motion.article>
  );
});

export default PostCard;
