export abstract class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }

  abstract statusCode: number;
  abstract serializeErrors(): { message: string; path?: string[]; type?: string, contexst?: { label: string, key: string } }[];
}
