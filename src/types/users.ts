export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  phone: string;
  is_owner: boolean;
  is_admin: boolean;
  is_active: boolean;
}
