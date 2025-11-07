import { mobileFormOptions } from "../form-options";
import { Form } from "../ui/form";
import { useMobileForm } from "./form";
import { KeepNumberSection } from "./keep-number-section";
import { NewNumberSection } from "./new-number-section";
import { mobileFormSchema } from "./schemas";
import { useSearch } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { updateOrder } from "../api/update-order";
import { useAppStore } from "../store";

type SimType = 'ESIM' | 'PHYSICAL';

const MobileForm = () => {
  const { simType = 'ESIM' } = useSearch({ strict: false }) as { simType?: SimType };
  const { mobileForm, setMobileForm } = useAppStore();
  const updateOrderMutation = useMutation({
    mutationKey: ['update-order', 'mobile'],
    mutationFn: updateOrder,
  });
  const formOptions = mobileFormOptions({ simType, draft: mobileForm ?? undefined });
  const form = useMobileForm({
    canSubmitWhenInvalid: true,
    ...formOptions,
    validators: {
      onSubmit: mobileFormSchema,
    },
    onSubmit: async ({ value }) => {
      setMobileForm(value);
      await updateOrderMutation.mutateAsync({ step: 'mobile', data: value });
    },
    onSubmitInvalid: (props) => {
      console.log("Mobile form invalid submission with ==>:", props);
    },
  });
  return (
    <div className="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.35)]">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
          Order summary
        </p>
        <h2 className="text-2xl font-semibold text-white">Create your mobile transfer request</h2>
        <p className="text-sm text-white/70">
          Tell us where service is active, confirm your SIM preference, and decide whether to keep or change your number.
        </p>
      </div>
      <form.AppForm>
        <Form className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <form.AppField name="serviceAddress">
              {(field) => <field.ServiceAddress />}
            </form.AppField>
            <form.AppField name="simType">
              {(field) => <field.SimType />}
            </form.AppField>
          </div>
          <form.AppField
            name="keepNumber"
            listeners={{
              onChange: ({ value, fieldApi }) => {
                const formApi = fieldApi.form;
                if (value === 'KEEP-NUMBER') {
                  formApi.resetField('newMobileNumber');
                  return;
                }

                if (value === 'NEW-NUMBER') {
                  formApi.resetField('planType');
                  formApi.resetField('mobileNumber');
                  formApi.resetField('otp');
                  formApi.resetField('otpStatus');
                  formApi.resetField('dob');
                  formApi.resetField('accountNumber');
                  return;
                }

                formApi.resetField('newMobileNumber');
                formApi.resetField('planType');
                formApi.resetField('mobileNumber');
                formApi.resetField('otp');
                formApi.resetField('otpStatus');
                formApi.resetField('dob');
                formApi.resetField('accountNumber');
              },
            }}
          >
            {(field) => <field.KeepNumber />}
          </form.AppField>
          <form.Subscribe selector={(state) => [state.values.keepNumber] as const}>
            {([keepNumberValue]) => {
              if (keepNumberValue === 'NEW-NUMBER') {
                return <NewNumberSection form={form} />;
              }
              if (keepNumberValue === 'KEEP-NUMBER') {
                return <KeepNumberSection form={form} />;
              }

              return null;
            }}
          </form.Subscribe>
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/60">
                  You can submit while invalid to preview how TanStack Form surfaces every issue.
                </p>
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || updateOrderMutation.isPending}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-sky-400/30 transition hover:from-sky-300 hover:to-indigo-300 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50"
                >
                  {updateOrderMutation.isPending ? "Saving..." : isSubmitting ? "Validating..." : "Next"}
                </button>
              </div>
            )}
          </form.Subscribe>
          <form.Subscribe selector={(state) => [state] as const}>
            {([state]) => (
              <div className="space-y-2 rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Live form state</p>
                <pre className="max-h-64 overflow-auto text-[11px] text-white/70">
                  {JSON.stringify(state, null, 2)}
                </pre>
              </div>
            )}
          </form.Subscribe>
        </Form>
      </form.AppForm>
    </div>
  )
}
export { MobileForm };
