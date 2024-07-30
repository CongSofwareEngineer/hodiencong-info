export enum REQUEST_TYPE {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export const IS_BROWSER = typeof window !== 'undefined';