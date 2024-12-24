export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  followers: string | null;
  following: string | null;
  views: number;
  hearts: number;
  description: string | null;
  picture: File | null;
  role: string;
  verified: boolean;
  token_verifier: string;
  created_at: Date;
  updated_at: Date;
}
