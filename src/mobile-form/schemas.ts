
import { z } from "zod";

export const simTypeSchema = z.enum(["PHYSICAL", "ESIM"]);
const planTypeSchema = z.enum(["PREPAID", "POSTPAID", ""]);
const otpStatusSchema = z.enum(["IDLE", "SENT", "VERIFIED"]);

const ACCOUNT_NUMBER_REGEX = /^\d{4}$/;
const DOB_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const OTP_REGEX = /^\d{4}$/;
const MOBILE_NUMBER_REGEX = /^04\d{8}$/;

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
      if (!values.newMobileNumber) {
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

    if (!MOBILE_NUMBER_REGEX.test(values.mobileNumber)) {
      ctx.addIssue({
        code: "custom",
        path: ["mobileNumber"],
        message: "Mobile number should start with 04",
      });
    }

    if (!OTP_REGEX.test(values.otp)) {
      ctx.addIssue({
        code: "custom",
        path: ["otp"],
        message: "OTP must be 4 digits",
      });
    }

    if (values.otpStatus !== "VERIFIED") {
      ctx.addIssue({
        code: "custom",
        path: ["otp"],
        message: "Verify the OTP",
      });
    }

    if (values.planType === "PREPAID") {
      if (!DOB_REGEX.test(values.dob)) {
        ctx.addIssue({
          code: "custom",
          path: ["dob"],
          message: "Date of birth must be in DD/MM/YYYY format",
        });
      }
    }

    if (values.planType === "POSTPAID") {
      if (!ACCOUNT_NUMBER_REGEX.test(values.accountNumber)) {
        ctx.addIssue({
          code: "custom",
          path: ["accountNumber"],
          message: "Account number must be 4 digits",
        });
      }
    }
  }
);

export type MobileFormValues = z.input<typeof mobileFormSchema>;
