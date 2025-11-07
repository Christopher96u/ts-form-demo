import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { AccountFormValues } from '../account-form/schema';
import type { MobileFormValues } from '../mobile-form/schemas';

export type AppStoreState = {
  accountForm: AccountFormValues | null;
  mobileForm: MobileFormValues | null;
  setAccountForm: (payload: AccountFormValues | null) => void;
  resetAccountForm: () => void;
  setMobileForm: (payload: MobileFormValues | null) => void;
  resetMobileForm: () => void;
};

export const useAppStore = create<AppStoreState>()(
  devtools(
    immer((set) => ({
      accountForm: null,
      mobileForm: null,
      setAccountForm: (payload) => {
        set((state) => {
          state.accountForm = payload;
      });
    },
    resetAccountForm: () => {
      set((state) => {
        state.accountForm = null;
      });
    },
    setMobileForm: (payload) => {
      set((state) => {
        state.mobileForm = payload;
      });
    },
      resetMobileForm: () => {
        set((state) => {
          state.mobileForm = null;
        });
      },
    })),
    { name: 'app-store' }
  )
);
