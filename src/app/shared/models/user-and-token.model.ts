import { User } from "./user.model";

export interface UserAndToken {
  user: User;

  access_token: string;
}
