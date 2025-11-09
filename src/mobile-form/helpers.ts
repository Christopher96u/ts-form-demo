import type { MobileFormValues } from "./schemas";
import type { AppFormApi } from "../hooks/form-hook";

type MobileFormInteractions = Pick<AppFormApi, "resetField" | "setFieldMeta">;

const MOBILE_KEEP_NUMBER_FIELDS: Array<keyof MobileFormValues> = [
  'planType',
  'mobileNumber',
  'otp',
  'otpStatus',
  'dob',
  'accountNumber',
];

const MOBILE_NEW_NUMBER_FIELDS: Array<keyof MobileFormValues> = ['newMobileNumber'];

const MOBILE_PREPAID_FIELDS: Array<keyof MobileFormValues> = ['dob'];
const MOBILE_POSTPAID_FIELDS: Array<keyof MobileFormValues> = ['accountNumber'];

/**
 * Resets a list of flat scalar fields. These helpers assume primitives only
 * (no nested objects/arrays) which matches our current use cases.
 */
const resetFields = (
  form: MobileFormInteractions,
  fields: ReadonlyArray<keyof MobileFormValues>,
) => {
  fields.forEach((field) => form.resetField(field));
};

export const resetMobileKeepSelection = (form: MobileFormInteractions) => {
  resetFields(form, MOBILE_NEW_NUMBER_FIELDS);
};

export const resetMobileNewSelection = (form: MobileFormInteractions) => {
  resetFields(form, MOBILE_KEEP_NUMBER_FIELDS);
};

export const resetMobileUnselectedState = (form: MobileFormInteractions) => {
  resetFields(form, [...MOBILE_KEEP_NUMBER_FIELDS, ...MOBILE_NEW_NUMBER_FIELDS]);
};

export const resetMobilePlanExclusiveFields = (
  form: MobileFormInteractions,
  planType: MobileFormValues['planType'],
) => {
  if (planType === 'PREPAID') {
    resetFields(form, MOBILE_POSTPAID_FIELDS);
    return;
  }

  if (planType === 'POSTPAID') {
    resetFields(form, MOBILE_PREPAID_FIELDS);
    return;
  }

  resetFields(form, [...MOBILE_PREPAID_FIELDS, ...MOBILE_POSTPAID_FIELDS]);
};
