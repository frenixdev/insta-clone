import type { UserResponseType as IUser } from "@/feature/auth/types";

export interface PostPropsType {
  _id: string;
  caption: string;
  imageUrl: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
  likeCount: number
}
