export class CreateError extends Error {
  status = 400;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CreateError.prototype);
  }
}

export default CreateError;
