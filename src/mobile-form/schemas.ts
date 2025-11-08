
import { z } from "zod";

export const simTypeSchema = z.enum(["PHYSICAL", "ESIM"]);
const planTypeSchema = z.enum(["PREPAID", "POSTPAID", ""]);
const otpStatusSchema = z.enum(["IDLE", "SENT", "VERIFIED"]);

const Base = z.object({
  serviceAddress: z.string().min(2, "Service address is required"),
  simType: simTypeSchema,
});

const DraftFields = z.object({
  newMobileNumber: z.string(),
  planType: planTypeSchema.optional(),
  mobileNumber: z.string(),
  otp: z.string(),
  otpStatus: otpStatusSchema,
  dob: z.string(),
  accountNumber: z.string(),
});

const CommonSchema = Base.merge(DraftFields);

const UnselectedSchema = CommonSchema.extend({
  keepNumber: z.literal("UNSELECTED"),
});

const NewNumberSchema = CommonSchema.extend({
  keepNumber: z.literal("NEW-NUMBER"),
});

const KeepNumberSchema = CommonSchema.extend({
  keepNumber: z.literal("KEEP-NUMBER"),
});

const DiscriminatedMobileFormSchema = z.discriminatedUnion("keepNumber", [
  UnselectedSchema,
  NewNumberSchema,
  KeepNumberSchema,
]);

export const mobileFormSchema = DiscriminatedMobileFormSchema.superRefine(
  (values, ctx) => {
    if (values.keepNumber === "UNSELECTED") {
      ctx.addIssue({
        code: "custom",
        path: ["keepNumber"],
        message: "Select yes or no please!",
      });
      return;
    }

    if (values.keepNumber === "NEW-NUMBER") {
      if (values.newMobileNumber.trim().length < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["newMobileNumber"],
          message: "Pick your new mobile number",
        });
      }
      return;
    }

    if (!values.planType) {
      ctx.addIssue({
        code: "custom",
        path: ["planType"],
        message: "Select your current plan",
      });
    }

    if (values.mobileNumber.trim().length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["mobileNumber"],
        message: "Your current mobile number is required",
      });
    }

    if (values.otp.trim().length < 4) {
      ctx.addIssue({
        code: "custom",
        path: ["otp"],
        message: "OTP is required",
      });
    }

    if (values.otpStatus !== "VERIFIED") {
      ctx.addIssue({
        code: "custom",
        path: ["otp"],
        message: "Verify the OTP",
      });
    }

    if (values.planType === "PREPAID" && values.dob.trim().length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["dob"],
        message: "Date of birth is required",
      });
    }

    if (values.planType === "POSTPAID" && values.accountNumber.trim().length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["accountNumber"],
        message: "Account number is required",
      });
    }
  }
);

export type MobileFormValues = z.input<typeof mobileFormSchema>;
