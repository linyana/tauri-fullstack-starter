export const PERMISSION = {
  PROJECT: 'PROJECT',
} as const;

export type PERMISSION = (typeof PERMISSION)[keyof typeof PERMISSION];
