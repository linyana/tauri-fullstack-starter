import React from 'react';
import type { IRouteType } from '@/types';
import { useGlobal } from '@/hooks';
import { Project } from './Project';

export const AuthProvider: React.FC<{
  route: IRouteType;
  children: React.ReactNode;
}> = ({ route, children }) => {
  const { project } = useGlobal();

  if (!project) {
    return <Project />;
  }

  return <>{children}</>;
};
