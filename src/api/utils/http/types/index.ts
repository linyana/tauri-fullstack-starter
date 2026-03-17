import { PLATFORM } from '@shared';
import { Method } from 'axios';

export type IHttpRequestType = {
  method: Method;
  platform: PLATFORM;
  url: string;
  projectId: number;
  data?: { [key in string]: any };
  params?: { [key in string]: any };
  headers?: { [key in string]: any };
};
