// Auth
interface AuthState {
  user: IUser;
  accessToken: string;
  isLoading: boolean;
  error: string;
}

interface IUser {
  name: string;
  role: string;
  email: string;
}

interface IAuth {
  user: IUser;
  accessToken: string;
}
