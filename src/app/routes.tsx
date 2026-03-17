import { Navigate } from 'react-router-dom';
import type { IRouteType } from '@/types';
import { LayoutDashboard, Plug, Settings, NotepadText } from 'lucide-react';

const NotFound = () => {
  throw new Response('Not Found', {
    status: 404,
    statusText: 'Not Found',
  });
};

export const routes: IRouteType[] = [
  {
    id: '/',
    path: '/',
    element: <></>,
    handle: {
      auth: false,
      layout: 'BASIC',
    },
  },
  {
    id: 'not-found',
    path: '*',
    element: <NotFound />,
  },
];
