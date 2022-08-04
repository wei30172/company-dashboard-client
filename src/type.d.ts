// Auth
interface AuthState {
  user: string;
  token: string;
  isLoading: boolean;
  error: string;
}

interface IUser {
  name: string;
  email: string;
}

interface IAuth {
  result: IUser;
  token: string;
}
