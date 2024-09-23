import { status } from '@grpc/grpc-js';
import { ValidationError } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class ValidationException extends RpcException {
  constructor(errors: ValidationError[]) {
    const message = Object.values(errors[0].constraints)[0];

    super({ code: status.INVALID_ARGUMENT, message });
  }
}
