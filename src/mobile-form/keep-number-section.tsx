import { useStore } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { mobileFormOptions } from "../form-options";
import { withMobileForm } from "./form";
import { sectionCardClasses, secondaryButtonClasses } from "./fields/styles";
import { sendOtp } from "../api/send-otp";
import { confirmOtp } from "../api/confirm-otp";

const KeepNumberSection = withMobileForm({
  ...mobileFormOptions({ simType: "ESIM" }),
  render: function Render({ form }) {
    const mobileNumber = useStore(form.store, (state) => state.values.mobileNumber);
    const otpValue = useStore(form.store, (state) => state.values.otp);
    const otpStatus = useStore(form.store, (state) => state.values.otpStatus);

    const sendOtpMutation = useMutation({
      mutationKey: ["send-otp"],
      mutationFn: sendOtp,
      onSuccess: () => {
        form.setFieldValue("otpStatus", "SENT");
        form.setFieldValue("otp", "");
        form.setFieldMeta("mobileNumber", (prev) => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: undefined },
          errorSourceMap: { ...prev.errorSourceMap, onServer: undefined },
        }));
        form.setFieldMeta("otp", (prev) => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: undefined },
          errorSourceMap: { ...prev.errorSourceMap, onServer: undefined },
        }));
      },
      onError: (error: unknown) => {
        const message = error instanceof Error ? error.message : "Unable to send OTP";
        form.setFieldMeta("mobileNumber", (prev) => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message }] },
          errorSourceMap: { ...prev.errorSourceMap, onServer: "form" },
        }));
      },
    });

    const verifyOtpMutation = useMutation({
      mutationKey: ["confirm-otp"],
      mutationFn: confirmOtp,
      onSuccess: () => {
        form.setFieldValue("otpStatus", "VERIFIED");
        form.setFieldMeta("otp", (prev) => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: undefined },
          errorSourceMap: { ...prev.errorSourceMap, onServer: undefined },
        }));
      },
      onError: (error: unknown) => {
        const message = error instanceof Error ? error.message : "Invalid OTP";
        form.setFieldMeta("otp", (prev) => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message }] },
          errorSourceMap: { ...prev.errorSourceMap, onServer: "form" },
        }));
      },
    });

    const handleSendOtp = () => {
      if (otpStatus === "VERIFIED" || sendOtpMutation.isPending) {
        return;
      }
      if (!mobileNumber.trim()) {
        form.setFieldMeta("mobileNumber", (prev) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            onServer: [{ message: "Enter your current mobile number before sending the OTP" }],
          },
          errorSourceMap: { ...prev.errorSourceMap, onServer: "form" },
        }));
        return;
      }
      sendOtpMutation.mutate({ mobileNumber });
    };

    const handleVerifyOtp = () => {
      if (otpStatus === "VERIFIED" || verifyOtpMutation.isPending) {
        return;
      }
      if (otpStatus === "IDLE") {
        form.setFieldMeta("otp", (prev) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            onServer: [{ message: "Send the OTP to your number before verifying" }],
          },
          errorSourceMap: { ...prev.errorSourceMap, onServer: "form" },
        }));
        return;
      }
      if (!otpValue.trim()) {
        form.setFieldMeta("otp", (prev) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            onServer: [{ message: "Enter the code you received" }],
          },
          errorSourceMap: { ...prev.errorSourceMap, onServer: "form" },
        }));
        return;
      }
      verifyOtpMutation.mutate({ otp: otpValue });
    };

    const isOtpLocked = otpStatus === "VERIFIED";

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
            {sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
          </button>
        </div>
        <div className="flex gap-2">
          <form.AppField name="otp">
            {(field) => <field.OTPField />}
          </form.AppField>
          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={isOtpLocked || otpStatus !== "SENT" || verifyOtpMutation.isPending}
            className={`${secondaryButtonClasses} self-end min-w-[140px] justify-center`}
          >
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify"}
          </button>
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
