import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import { routes } from '@/routes';
import { LayoutProvider } from '../Layout';
import { RouteError } from '@/components';
import { useGlobal } from '@/hooks';
import type { ILayoutType, IMenuPositionType, IRouteType } from '@/types';
import { PERMISSION } from '@shared';
import { hasAnyPermission } from '@/utils';

const normalizeRoutes = (
  routes: IRouteType[],
  params: {
    permissions: PERMISSION[];
  },
): IRouteType[] => {
  const { permissions } = params;

  return routes.flatMap((route) => {
    const handle = {
      auth: true,
      layout: 'DEFAULT' as ILayoutType,
      permissions: [],
      ...route.handle,
      menu: route.handle?.menu
        ? {
            position: 'TOP' as IMenuPositionType,
            ...route.handle?.menu,
          }
        : undefined,
    };
    const { permissions: routePermissions } = handle;

    if (!hasAnyPermission(permissions, routePermissions)) {
      return [];
    }

    return [
      {
        ...route,
        handle,
        children: route.children
          ? normalizeRoutes(route.children, {
              permissions,
            })
          : undefined,
      },
    ];
  });
};

export const Routes = () => {
  const { permissions } = useGlobal();

  const finalRoutes = useMemo(() => {
    let mergedRoutes = routes;

    return normalizeRoutes(mergedRoutes, {
      permissions,
    });
  }, [permissions]);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: <LayoutProvider routes={finalRoutes} />,
          children: finalRoutes as RouteObject[],
          errorElement: <RouteError />,
        },
      ]),
    [finalRoutes],
  );

  return <RouterProvider router={router} />;
};
