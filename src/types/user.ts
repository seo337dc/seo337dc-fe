export type TUser = {
  id: string;
  name: string;
};

export type TLoginDto = {
  accessToken: string;
  user: TUser;
};

export type TResData = {
  data: TLoginDto;
};
