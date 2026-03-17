import { projects } from '@prisma/client';

export abstract class BaseHttpService {
  abstract getHeaders(params: { project: projects }): Promise<{ [key in string]: string }>;
  abstract getUrl(params: { project: projects; url: string }): Promise<string>;
  abstract handleError(params: { error: any }): Promise<void>;
}
