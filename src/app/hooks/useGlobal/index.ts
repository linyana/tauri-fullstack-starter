import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IGlobalStateType, IStateType } from './types';

const initData: IStateType = {
  apiBaseUrl: 'http://localhost:48327/api',
  token: '',
  adminToken: '',
  appToken: '',
  collapsed: false,
  permissions: [],
  project: null,
};

export const useGlobal = create<IGlobalStateType>()(
  persist(
    (set) => ({
      ...initData,

      actions: {
        set,
        reset: (state) =>
          set({
            ...initData,
            ...state,
          }),
      },
    }),
    // Persistent configuration(localStorage)
    {
      name: 'tauri-starter',
      partialize: ({ token, adminToken, appToken, collapsed }) => ({
        token,
        adminToken,
        appToken,
        collapsed,
      }),
    },
  ),
);
