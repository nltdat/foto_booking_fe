export type UserRole = "CUSTOMER" | "PHOTOGRAPHER";

export interface JwtPayload {
  exp?: number;
  iat?: number;
  role?: UserRole;
  sub?: string;
}
