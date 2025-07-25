export interface userData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface userInfo {
  id: number;
  email: string;
  name: string;
  last_name: string;
  image: null;
  username: string;
  followees: [];
  followers: [];
  password: string;
}

export interface userLogin {
  email: string;
  password: string;
}

export interface response {
  msg: string;
  status: string;
  user: userInfo;
}
