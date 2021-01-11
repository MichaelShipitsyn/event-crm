export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string | null;
  phone: string | null;
  is_owner: boolean;
  is_admin: boolean;
  is_active: boolean;
}
