export type Role = "admin" | "staff" | "marketer" | "customer";

export interface User {
  id: string;
  email: string;
  role: Role;
  full_name?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}
