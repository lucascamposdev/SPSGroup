export type User = {
    id: string;
    name: string;
    email: string;
    type: UserType
    password: string
}

export enum UserType {
    ADMIN = "ADMIN",
    USER = "USER"
  }