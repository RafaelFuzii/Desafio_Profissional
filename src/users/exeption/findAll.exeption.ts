import { HttpException, HttpStatus } from "@nestjs/common";

export class FindAllException extends HttpException {
    constructor() {
      super('User Find', HttpStatus.OK);
    }
  }