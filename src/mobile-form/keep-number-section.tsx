import { useMutation } from "@tanstack/react-query";
import { mobileFormOptions } from "../form-options";
import { withMobileForm } from "./form";
import { sectionCardClasses, secondaryButtonClasses } from "./fields/styles";
import { sendOtp } from "../api/send-otp";
import { confirmOtp } from "../api/confirm-otp";
import { resetMobilePlanExclusiveFields } from "./helpers";
import { clearServerError, setServerError } from "../ui/ts-form-helpers";

const KeepNumberSection = withMobileForm({
  ...mobileFormOptions({ simType: "ESIM" }),
  render: function Render({ form }) {
    const sendOtpMutation = useMutation({
      mutationKey: ["send-otp"],
      mutationFn: sendOtp,
      onSuccess: () => {
        form.setFieldValue("otpStatus", "SENT");
        form.setFieldValue("otp", "");
        clearServerError(form, "mobileNumber");
        clearServerError(form, "otp");
      },
      onError: (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unable to send OTP";
        setServerError(form, "mobileNumber", message);
      },
    });

    const verifyOtpMutation = useMutation({
      mutationKey: ["confirm-otp"],
      mutationFn: confirmOtp,
      onSuccess: () => {
        form.setFieldValue("otpStatus", "VERIFIED");
        clearServerError(form, "otp");
      },
      onError: (error: unknown) => {
        const message = error instanceof Error ? error.message : "Invalid OTP";
        setServerError(form, "otp", message);
      },
    });

    const handleSendOtp = () => {
      const { mobileNumber, otpStatus } = form.store.state.values;
      if (otpStatus === "VERIFIED" || sendOtpMutation.isPending) {
        return;
      }
      if (!mobileNumber.trim()) {
        setServerError(
          form,
          "mobileNumber",
          "Enter your current mobile number before sending the OTP",
        );
        return;
      }
      sendOtpMutation.mutate({ mobileNumber });
    };

    const handleVerifyOtp = () => {
      const { otp: otpValue, otpStatus } = form.store.state.values;
      if (otpStatus === "VERIFIED" || verifyOtpMutation.isPending) {
        return;
      }
      if (otpStatus === "IDLE") {
        setServerError(form, "otp", "Send the OTP to your number before verifying");
        return;
      }
      if (!otpValue.trim()) {
        setServerError(form, "otp", "Enter the code you received");
        return;
      }
      verifyOtpMutation.mutate({ otp: otpValue });
    };

    return (
      <section className={`${sectionCardClasses} space-y-5`}>
      <header className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
          Keep your current number
        </p>
        <p className="text-base text-white/80">
          We’ll verify ownership before migrating the service.
        </p>
        <p className="text-xs text-white/60">Use OTP code <span className="font-semibold text-white">1111</span> to simulate a successful verification.</p>
      </header>
        <form.Subscribe selector={(state) => state.values.otpStatus}>
          {(otpStatus) => {
            const isOtpLocked = otpStatus === 'VERIFIED';
            return (
              <>
                <div className="flex gap-2">
                  <form.AppField name="mobileNumber">
                    {(field) => <field.CurrentMobileNumberField />}
                  </form.AppField>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isOtpLocked || sendOtpMutation.isPending}
                    className={`${secondaryButtonClasses} self-end min-w-[140px] justify-center`}
                  >
                    {sendOtpMutation.isPending ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <form.AppField name="otp">
                    {(field) => <field.OTPField />}
                  </form.AppField>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isOtpLocked || otpStatus !== 'SENT' || verifyOtpMutation.isPending}
                    className={`${secondaryButtonClasses} self-end min-w-[140px] justify-center`}
                  >
                    {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </>
            );
          }}
        </form.Subscribe>
        <form.AppField
          name="planType"
          listeners={{
            onChange: ({ value, fieldApi }) => {
              resetMobilePlanExclusiveFields(fieldApi.form, value);
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
