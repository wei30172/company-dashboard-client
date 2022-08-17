// Auth
interface IUser {
  role: string;
  name: string;
  email: string;
}

interface IAuth {
  user: IUser;
  accessToken: string;
}

interface AuthState {
  user: IUser;
  accessToken: string;
}
