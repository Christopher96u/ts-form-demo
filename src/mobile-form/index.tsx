import { mobileFormOptions } from "../form-options";
import { Form } from "../ui/form";
import { useMobileForm } from "./form";
import { KeepNumberSection } from "./keep-number-section";
import { NewNumberSection } from "./new-number-section";
import { mobileFormSchema } from "./schemas";

// Current issues
//1. We should display the error messages for all the states. For example: when field "keep current phone number" is not selected
//2. onSubmit type issue
// 3. How to handle the OTP status/flag/value? We need an input OTP and a "send" button next to it and programatically mark the field as "valid" after a 200 status from /confirm-otp API call after clicking on "send" button
// 4.  keep-number-section component is ok? I'm using conditional rendering to display/hide the conditional field
const MobileForm = () => {
  const simType = "ESIM" // This is defined always from search params
  const formOptions = mobileFormOptions({ simType });
  const form = useMobileForm({
    canSubmitWhenInvalid: true,
    ...formOptions,
    validators: {
      onSubmit: mobileFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("form validated successfully with ==>:", value);
    },
    onSubmitInvalid: (props) => {
      console.log("Mobile form invalid submission with ==>:", props);
    },
  });
  return (
    <div>
       <form.AppForm>
        <Form className="space-y-4">
          <form.AppField name="serviceAddress">
            {(field) => <field.ServiceAddress />}
          </form.AppField>
          <form.AppField name="simType">
            {(field) => <field.SimType />}
          </form.AppField>
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
              <button type="submit" disabled={!canSubmit || isSubmitting} className="rounded bg-red-300 px-4 py-2 cursor-pointer hover:bg-red-400 disabled:bg-gray-300">
                {isSubmitting ? "Loading..." : "Submit"}
              </button>
            )}
          </form.Subscribe>
          <form.Subscribe selector={(state) => [state] as const}>
            {([state]) => (
              <pre className="text-xs">
                {JSON.stringify(state, null, 2)}
              </pre>
            )}
          </form.Subscribe>
        </Form>
      </form.AppForm>
    </div>
  )
}
export { MobileForm };
