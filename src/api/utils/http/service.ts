import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttpRequestType } from './types';
import { PLATFORM } from '@shared';
import { prisma } from '../prisma/service';
import { BaseHttpService } from './services/base.service';
import { githubHttpService } from './services/github/service';

class HttpService {
  constructor() {}

  async getService(params: { projectId: number; platform: PLATFORM }) {
    const { projectId, platform } = params;
    const project = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error(`Project ${projectId} not found`);
    }

    const serviceMap: { [key in PLATFORM]: BaseHttpService } = {
      GITHUB: githubHttpService,
    };

    return {
      project,
      service: serviceMap[platform],
    };
  }

  async request<T>({
    method,
    platform,
    url,
    data,
    params,
    headers,
    projectId,
  }: IHttpRequestType): Promise<T | any> {
    const { service, project } = await this.getService({
      platform,
      projectId,
    });
    const newHeaders = await service.getHeaders({ project });

    let apiUrl = url;
    if (!apiUrl.startsWith('http')) {
      apiUrl = await service.getUrl({ project, url });
    }

    const axiosConfig: AxiosRequestConfig = {
      method,
      url: apiUrl,
      params,
      headers: {
        ...newHeaders,
        ...headers,
      },
      data,
    };
    try {
      const response: AxiosResponse<T> = await axios(axiosConfig);

      return response.data;
    } catch (error: any) {
      if (['ECONNABORTED', 'ECONNREFUSED'].includes(error.code)) {
        throw new Error(`Request timeout`);
      }
      await service.handleError({ error: error });
    }
  }
}
