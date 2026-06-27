import { useRef, useState } from "react";
import { Button, ImagePreview, Input } from "@/shared";
import { useNavigate } from "react-router-dom";
import usePostStore from "../store/post.store";
import useAuthStore from "@/feature/auth/store/auth.store";
import { motion } from "motion/react";

const CreatePostModal = () => {
  const [caption, setCaption] = useState("");
  const imageRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const uploadPost = usePostStore((s) => s.uploadPost);
  const user = useAuthStore((s) => s.user);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = imageRef?.current?.files?.[0];
    if(!file || !user) return ;
    const post = {
      caption,
      file,
      username: user.username,
      profileImg: user.profileImg,
    };
    uploadPost(post);
    navigate("/");
  };

  return (
    <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-center justify-center w-full h-full"
    >

    <form
      onSubmit={handleSubmit}

      className="space-y-3 w-100"
    >
      <ImagePreview itemRef={imageRef} width="100%" />
      <Input
        type="text"
        id="caption"
        name="caption"
        placeholder="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="border-b outline-none w-full h-auto border-b-zinc-400 p-1"
      />
      <Button className="bg-blue-500 w-full px-4 py-2 block ">Post</Button>
    </form>
    </motion.div>

  );
};

export default CreatePostModal;
