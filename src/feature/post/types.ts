import type { UserResponseType as IUser } from "@/feature/auth/types";

export interface PostType {
  _id: string;
  caption: string;
  imageUrl: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  isLiked?: boolean;
  isUploading?: boolean;
}
export interface PostPropsType extends PostType {
  isAuthor?: boolean;
  toggleLike: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

export interface TempPostPropsType {
  caption: string;
  imageUrl: string;
  author: {
    username: string;
    profileImg: string;
  };
  isLoading?: boolean;
  isError?: boolean;
}
