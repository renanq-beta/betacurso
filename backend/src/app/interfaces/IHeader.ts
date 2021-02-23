export default interface IHeader{
  req: {
    headers: {
      origin: string;
      authorization: string;
      host: string;
      referer: string;
      'user-agent': string;
    }
  }
}