import { PERMISSION } from '@shared';

export type IStateType = {
  token: string;
  adminToken: string;
  appToken: string;
  apiBaseUrl: string;
  collapsed: boolean;
  permissions: PERMISSION[];
  project: {
    name: string;
  } | null;
};

export type IStateActionsType = {
  set: (state: Partial<IStateType>) => void;
  reset: (state?: Partial<IStateType>) => void;
};

export type IGlobalStateType = IStateType & {
  actions: IStateActionsType;
};
