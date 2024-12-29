export interface Article {
  id: string;
  title: string;
  content: string;
  author_id: string;
  views?: string;
  hearts?: string;
  comments?: string;
  created_at: Date;
  updated_at: Date;
}
