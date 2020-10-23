interface IUser {
  username: string;
  password: string;
  email?: string;
}

export class User implements IUser {
  username: string;
  password: string;
  email?: string;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
