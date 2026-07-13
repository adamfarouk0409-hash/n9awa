export interface ContactMessage {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessageInsert {
  user_id?: string | null;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
}
