export const PLATFORM = {
  GITHUB: 'GITHUB',
} as const;

export type PLATFORM = (typeof PLATFORM)[keyof typeof PLATFORM];
