import { useHttp } from '@/hooks';
import type { IHttpGenerics, IHttpType } from '@/hooks/types';
import {
  ICreateProjectRequestType,
  IGetProjectListRequestType,
  IGetProjectListResponseType,
} from '@shared';

export const useGetProjects = <
  T extends IHttpGenerics = {
    request: IGetProjectListRequestType;
    response: IGetProjectListResponseType;
  },
>(
  params?: IHttpType<T>,
) =>
  useHttp<T>({
    url: '/projects',
    method: 'get',
    ...params,
  });

export const useCreateProject = <
  T extends IHttpGenerics = {
    request: ICreateProjectRequestType;
  },
>(
  params?: IHttpType<T>,
) =>
  useHttp<T>({
    url: '/projects',
    method: 'post',
    ...params,
  });
