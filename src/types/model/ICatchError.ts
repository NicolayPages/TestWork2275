export interface ICatchError {
  message: string;
  response: {
    data: {
      message: string;
    };
    status: number;
  };
}
