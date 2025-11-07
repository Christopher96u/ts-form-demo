import { accountFormSchema, type AccountFormValues } from './schema';
import { useAccountForm } from './form';
import { Form } from '../ui/form';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { updateOrder } from '../api/update-order';
import { useAppStore } from '../store';

const defaultValues: AccountFormValues = {
  firstName: '',
  lastName: '',
};

export const AccountForm = () => {
  const navigate = useNavigate();
  const { accountForm, setAccountForm } = useAppStore();
  const updateOrderMutation = useMutation({
    mutationKey: ['update-order', 'account'],
    mutationFn: updateOrder,
  });
  const form = useAccountForm({
    defaultValues: accountForm ?? defaultValues,
    canSubmitWhenInvalid: true,
    validators: {
      onSubmit: accountFormSchema,
    },
    onSubmit: async ({ value }) => {
      setAccountForm(value);
      await updateOrderMutation.mutateAsync({ step: 'account', data: value });
      await navigate({ to: '/step-2' });
    },
    onSubmitInvalid: ({ value }) => {
      console.log('Account form invalid =>', value);
    },
  });

  return (
    <form.AppForm>
      <Form className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <form.AppField name="firstName">
            {(field) => <field.FirstName />}
          </form.AppField>
          <form.AppField name="lastName">
            {(field) => <field.LastName />}
          </form.AppField>
        </div>
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting || updateOrderMutation.isPending}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-emerald-400/30 transition hover:from-emerald-300 hover:to-teal-300 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50"
            >
              {updateOrderMutation.isPending ? 'Saving...' : isSubmitting ? 'Validating...' : 'Next'}
            </button>
          )}
        </form.Subscribe>
      </Form>
    </form.AppForm>
  );
};
