import { mobileFormOptions } from "../form-options";
import { withMobileForm } from "./form";

const KeepNumberSection = withMobileForm({
  ...mobileFormOptions({ simType: "ESIM" }),
  render: function Render({ form }) {
    return (
      <section className="space-y-2">
        <div className="flex gap-2">
        <form.AppField name="mobileNumber">
          {(field) => <field.CurrentMobileNumberField />}
        </form.AppField>
          <button type="button" className="self-end bg-blue-200 rounded px-2 py-1 cursor-pointer hover:bg-blue-300">Send OTP</button>
        </div>
        <div className="flex gap-2">
          <form.AppField name="otp">
            {(field) => <field.OTPField />}
          </form.AppField>
          <button type="button" className="self-end bg-blue-200 rounded px-2 py-1 cursor-pointer hover:bg-blue-300">Verify</button>
        </div>
        <form.AppField
          name="planType"
          listeners={{
            onChange: ({ value, fieldApi }) => {
              const formApi = fieldApi.form;
              if (value === 'PREPAID') {
                formApi.resetField('accountNumber');
                return;
              }

              if (value === 'POSTPAID') {
                formApi.resetField('dob');
                return;
              }

              formApi.resetField('accountNumber');
              formApi.resetField('dob');
            },
          }}
        >
          {(field) => <field.PlanField />}
        </form.AppField>
        <form.Subscribe selector={(state) => [state.values.keepNumber, state.values.planType] as const}>
          {([keepNumberValue, planType]) => {
            if (keepNumberValue !== 'KEEP-NUMBER') {
              return null;
            }

            if (planType === "POSTPAID") {
              return (
                <form.AppField name="accountNumber">
                  {(field) => <field.AccountNumberField />}
                </form.AppField>
              );
            }

            if (planType === "PREPAID") {
              return (
                <form.AppField name="dob">
                  {(field) => <field.DOBField />}
                </form.AppField>
              );
            }

            return null;
          }}
        </form.Subscribe>
      </section>
    );
  },
})

export { KeepNumberSection };
