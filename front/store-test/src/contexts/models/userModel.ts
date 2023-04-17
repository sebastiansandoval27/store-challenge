export interface IUser {
  id: number;
  name: string;
  email: string;
}

export type UserContextType = {
  todos: IUser[];
  setUser: (user: IUser) => void;
  removeUser: (id: number) => void;
};