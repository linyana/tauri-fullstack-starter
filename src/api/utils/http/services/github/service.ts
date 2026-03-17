import { projects } from '@prisma/client';
import { BaseHttpService } from '../base.service';

class GithubHttpService extends BaseHttpService {
  async getHeaders(params: { project: projects }) {
    const { project } = params;

    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async getUrl(params: { project: projects; url: string }) {
    const { project, url } = params;
    return `${url}`;
  }

  async handleError(params: { error: any }) {
    const { error } = params;
    const errorMessage = error?.message || 'Unknown error';
    throw new Error(errorMessage);
  }
}

export const githubHttpService = new GithubHttpService();
