import type { MobileFormValues } from "./schemas";
import type { MobileFormApi } from "./form";

type MobileFormInteractions = Pick<MobileFormApi, "resetField" | "setFieldMeta">;

const MOBILE_KEEP_NUMBER_FIELDS: Array<keyof Pick<MobileFormValues, 'planType' | 'mobileNumber' | 'otp' | 'otpStatus' | 'dob' | 'accountNumber'>> = [
  'planType',
  'mobileNumber',
  'otp',
  'otpStatus',
  'dob',
  'accountNumber',
];

const MOBILE_NEW_NUMBER_FIELDS: Array<keyof Pick<MobileFormValues, 'newMobileNumber'>> = ['newMobileNumber'];

const MOBILE_PREPAID_FIELDS: Array<keyof Pick<MobileFormValues, 'dob'>> = ['dob'];
const MOBILE_POSTPAID_FIELDS: Array<keyof Pick<MobileFormValues, 'accountNumber'>> = ['accountNumber'];

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
