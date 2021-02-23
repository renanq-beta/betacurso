export default interface IUsers{
  id: string;
  name: string;
  email: string;
  password?: string;
  rules?: string;
  createdAt?: Date;
  actived?: string;
  password_recovery?: string;
};
