export class RequestError {
  errorCode: number;
  genericError: string | null = null;
  errors: ErrorModal[] = [];
}

export class ErrorModal {
  message: string;
  field: string;
}

