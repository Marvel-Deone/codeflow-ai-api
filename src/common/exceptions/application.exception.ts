export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error: string;
  path: string;
  timestamp: string;
  requestId?: string;
}