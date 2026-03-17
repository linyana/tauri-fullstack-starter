import { PERMISSION } from '@shared';

export const selectPermission = (permission: PERMISSION) => permission;
export const hasPermission = (currentPermission: PERMISSION, permission: PERMISSION) =>
  currentPermission === permission;

export const hasAnyPermission = (
  currentPermissions: PERMISSION[],
  permissions: PERMISSION[] = [],
) => {
  if (!permissions?.length) return true;
  const currentPermissionTypes = new Set(currentPermissions);
  return permissions.some((permission) => currentPermissionTypes.has(permission));
};

export const hasAllPermissions = (
  currentPermissions: PERMISSION[],
  permissions: PERMISSION[] = [],
) => {
  if (!permissions?.length) return true;
  const currentPermissionTypes = new Set(currentPermissions);
  return permissions.every((permission) => currentPermissionTypes.has(permission));
};
