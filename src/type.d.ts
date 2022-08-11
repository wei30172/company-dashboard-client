// Auth
interface AuthState {
  user: IUser;
  accessToken: string;
  isLoading: boolean;
  error: string;
}

interface IUser {
  role: string;
  name: string;
  email: string;
}

interface IAuth {
  user: IUser;
  accessToken: string;
}
