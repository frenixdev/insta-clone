export interface UserResponseType {
  _id: string;
  name: string;
  email: string;
  username: string;
  profileImg: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}
export interface AuthResponseType {
  success: boolean;
  message: string;
  data: UserResponseType;
}
export interface RegisterType {
  email: string;
  password: string;
  username: string;
}
export interface LoginUserType {
  password: string;
  username: string;
}

export interface RegisterType {
  email: string;
  password: string;
  username: string;
}
export interface LoginUserType {
  password: string;
  username: string;
}
