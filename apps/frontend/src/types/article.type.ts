import { User } from "./user.type";

export interface Article {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author: User;
  views?: string;
  hearts?: string;
  comments?: string;
  created_at: string;
  updated_at: string;
}
