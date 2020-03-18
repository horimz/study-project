export enum ErrorType {
  none,
  badRequest
}

export interface ErrorState {
  hasError: boolean;
  type: ErrorType;
}

// TODO: any way for typesafe actions?
export interface ErrorAction {
  type: string;
  payload?: any;
}
