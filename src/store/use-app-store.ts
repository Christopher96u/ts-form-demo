import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { AccountFormValues } from '../account-form/schema';
import type { MobileFormDraft } from '../mobile-form/schemas';

export type AppStoreState = {
  test: string;
  accountForm: AccountFormValues | null;
  mobileForm: MobileFormDraft | null;
  setAccountForm: (payload: AccountFormValues | null) => void;
  resetAccountForm: () => void;
  setMobileForm: (payload: MobileFormDraft | null) => void;
  resetMobileForm: () => void;
};

export const useAppStore = create<AppStoreState>()(
  devtools(
    immer((set) => ({
      test: 'test',
      accountForm: null,
      mobileForm: null,
      setAccountForm: (payload) => {
        set(
          (state) => {
            state.accountForm = payload;
          },
          false,
          'account/setAccountForm'
        );
      },
      resetAccountForm: () => {
        set(
          (state) => {
            state.accountForm = null;
          },
          false,
          'account/resetAccountForm'
        );
      },
      setMobileForm: (payload) => {
        set(
          (state) => {
            state.mobileForm = payload;
          },
          false,
          'mobile/setMobileForm'
        );
      },
      resetMobileForm: () => {
        set(
          (state) => {
            state.mobileForm = null;
          },
          false,
          'mobile/resetMobileForm'
        );
      },
    })),
    { name: 'app-store' }
  )
);
