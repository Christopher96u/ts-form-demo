import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '../ui/form';
import { AccountFirstNameField } from './fields/first-name';
import { AccountLastNameField } from './fields/last-name';

export const { useAppForm: useAccountForm, withForm: withAccountForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FirstName: AccountFirstNameField,
    LastName: AccountLastNameField,
  },
  formComponents: {},
});
